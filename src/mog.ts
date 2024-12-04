import {
  Approval as ApprovalEvent,
  AutoLiquify as AutoLiquifyEvent,
  ClearStuck as ClearStuckEvent,
  ClearToken as ClearTokenEvent,
  EditTax as EditTaxEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Transfer as TransferEvent,
  set_MaxTX as set_MaxTXEvent,
  set_MaxWallet as set_MaxWalletEvent,
  set_Receivers as set_ReceiversEvent,
  set_SwapBack as set_SwapBackEvent,
  user_TxExempt as user_TxExemptEvent,
  user_exemptfromfees as user_exemptfromfeesEvent,
} from "../generated/MOG/MOG";
import {
  Approval,
  AutoLiquify,
  ClearStuck,
  ClearToken,
  EditTax,
  OwnershipTransferred,
  Transfer,
  set_MaxTX,
  set_MaxWallet,
  set_Receivers,
  set_SwapBack,
  user_TxExempt,
  user_exemptfromfees,
  User,
} from "../generated/schema";
import { Bytes, BigInt } from "@graphprotocol/graph-ts";

// Utility function to create or load a User
function getOrCreateUser(address: Bytes): User {
  let user = User.load(address);
  if (!user) {
    user = new User(address);
    user.balance = BigInt.fromI32(0);
    user.isExemptFromFees = false;
    user.isExemptFromTxLimit = false;
    user.save();
  }
  return user;
}

// Handle Transfer Event
export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.value = event.params.value;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();

  // Update User balances
  let sender = getOrCreateUser(event.params.from);
  let recipient = getOrCreateUser(event.params.to);
  sender.balance = sender.balance.minus(event.params.value);
  recipient.balance = recipient.balance.plus(event.params.value);
  sender.save();
  recipient.save();
}

// Handle Approval Event
export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.owner = event.params.owner;
  entity.spender = event.params.spender;
  entity.value = event.params.value;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

// Handle AutoLiquify Event
export function handleAutoLiquify(event: AutoLiquifyEvent): void {
  let entity = new AutoLiquify(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.amountETH = event.params.amountETH;
  entity.amountTokens = event.params.amountTokens;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

// Handle ClearStuck Event
export function handleClearStuck(event: ClearStuckEvent): void {
  let entity = new ClearStuck(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.amount = event.params.amount;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

// Handle ClearToken Event
export function handleClearToken(event: ClearTokenEvent): void {
  let entity = new ClearToken(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.TokenAddressCleared = event.params.TokenAddressCleared;
  entity.Amount = event.params.Amount;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

// Handle OwnershipTransferred Event
export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {
  let entity = new OwnershipTransferred(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();

  // Update new owner
  let newOwner = getOrCreateUser(event.params.newOwner);
  newOwner.save();
}

// Handle set_MaxTX Event
export function handleSetMaxTX(event: set_MaxTXEvent): void {
  let entity = new set_MaxTX(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.maxTX = event.params.maxTX;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

// Handle user_TxExempt Event
export function handleUserTxExempt(event: user_TxExemptEvent): void {
  let entity = new user_TxExempt(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.Wallet = event.params.Wallet;
  entity.Exempt = event.params.Exempt;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();

  // Update User
  let user = getOrCreateUser(event.params.Wallet);
  user.isExemptFromTxLimit = event.params.Exempt;
  user.save();
}

// Handle user_exemptfromfees Event
export function handleUserExemptFromFees(event: user_exemptfromfeesEvent): void {
  let entity = new user_exemptfromfees(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.Wallet = event.params.Wallet;
  entity.Exempt = event.params.Exempt;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();

  // Update User
  let user = getOrCreateUser(event.params.Wallet);
  user.isExemptFromFees = event.params.Exempt;
  user.save();
}

// handleEditTax
export function handleEditTax(event: EditTaxEvent): void {
  let entity = new EditTax(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.Buy = event.params.Buy;
  entity.Sell = event.params.Sell;
  entity.Transfer = event.params.Transfer;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

//handleset_MaxWallet
export function handleset_MaxWallet(event: set_MaxWalletEvent): void {
  let entity = new set_MaxWallet(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.maxWallet = event.params.maxWallet;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

//handleset_Receivers
export function handleset_Receivers(event: set_ReceiversEvent): void {
  let entity = new set_Receivers(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.marketingFeeReceiver = event.params.marketingFeeReceiver;
  entity.buybackFeeReceiver = event.params.buybackFeeReceiver;
  entity.burnFeeReceiver = event.params.burnFeeReceiver;
  entity.devFeeReceiver = event.params.devFeeReceiver;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

//handleset_SwapBack
export function handleset_SwapBack(event: set_SwapBackEvent): void {
  let entity = new set_SwapBack(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.Amount = event.params.Amount;
  entity.Enabled = event.params.Enabled;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}
