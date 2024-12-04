import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
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
  user_exemptfromfees
} from "../generated/MOG/MOG"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createAutoLiquifyEvent(
  amountETH: BigInt,
  amountTokens: BigInt
): AutoLiquify {
  let autoLiquifyEvent = changetype<AutoLiquify>(newMockEvent())

  autoLiquifyEvent.parameters = new Array()

  autoLiquifyEvent.parameters.push(
    new ethereum.EventParam(
      "amountETH",
      ethereum.Value.fromUnsignedBigInt(amountETH)
    )
  )
  autoLiquifyEvent.parameters.push(
    new ethereum.EventParam(
      "amountTokens",
      ethereum.Value.fromUnsignedBigInt(amountTokens)
    )
  )

  return autoLiquifyEvent
}

export function createClearStuckEvent(amount: BigInt): ClearStuck {
  let clearStuckEvent = changetype<ClearStuck>(newMockEvent())

  clearStuckEvent.parameters = new Array()

  clearStuckEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return clearStuckEvent
}

export function createClearTokenEvent(
  TokenAddressCleared: Address,
  Amount: BigInt
): ClearToken {
  let clearTokenEvent = changetype<ClearToken>(newMockEvent())

  clearTokenEvent.parameters = new Array()

  clearTokenEvent.parameters.push(
    new ethereum.EventParam(
      "TokenAddressCleared",
      ethereum.Value.fromAddress(TokenAddressCleared)
    )
  )
  clearTokenEvent.parameters.push(
    new ethereum.EventParam("Amount", ethereum.Value.fromUnsignedBigInt(Amount))
  )

  return clearTokenEvent
}

export function createEditTaxEvent(
  Buy: i32,
  Sell: i32,
  Transfer: i32
): EditTax {
  let editTaxEvent = changetype<EditTax>(newMockEvent())

  editTaxEvent.parameters = new Array()

  editTaxEvent.parameters.push(
    new ethereum.EventParam(
      "Buy",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(Buy))
    )
  )
  editTaxEvent.parameters.push(
    new ethereum.EventParam(
      "Sell",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(Sell))
    )
  )
  editTaxEvent.parameters.push(
    new ethereum.EventParam(
      "Transfer",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(Transfer))
    )
  )

  return editTaxEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}

export function createset_MaxTXEvent(maxTX: BigInt): set_MaxTX {
  let setMaxTxEvent = changetype<set_MaxTX>(newMockEvent())

  setMaxTxEvent.parameters = new Array()

  setMaxTxEvent.parameters.push(
    new ethereum.EventParam("maxTX", ethereum.Value.fromUnsignedBigInt(maxTX))
  )

  return setMaxTxEvent
}

export function createset_MaxWalletEvent(maxWallet: BigInt): set_MaxWallet {
  let setMaxWalletEvent = changetype<set_MaxWallet>(newMockEvent())

  setMaxWalletEvent.parameters = new Array()

  setMaxWalletEvent.parameters.push(
    new ethereum.EventParam(
      "maxWallet",
      ethereum.Value.fromUnsignedBigInt(maxWallet)
    )
  )

  return setMaxWalletEvent
}

export function createset_ReceiversEvent(
  marketingFeeReceiver: Address,
  buybackFeeReceiver: Address,
  burnFeeReceiver: Address,
  devFeeReceiver: Address
): set_Receivers {
  let setReceiversEvent = changetype<set_Receivers>(newMockEvent())

  setReceiversEvent.parameters = new Array()

  setReceiversEvent.parameters.push(
    new ethereum.EventParam(
      "marketingFeeReceiver",
      ethereum.Value.fromAddress(marketingFeeReceiver)
    )
  )
  setReceiversEvent.parameters.push(
    new ethereum.EventParam(
      "buybackFeeReceiver",
      ethereum.Value.fromAddress(buybackFeeReceiver)
    )
  )
  setReceiversEvent.parameters.push(
    new ethereum.EventParam(
      "burnFeeReceiver",
      ethereum.Value.fromAddress(burnFeeReceiver)
    )
  )
  setReceiversEvent.parameters.push(
    new ethereum.EventParam(
      "devFeeReceiver",
      ethereum.Value.fromAddress(devFeeReceiver)
    )
  )

  return setReceiversEvent
}

export function createset_SwapBackEvent(
  Amount: BigInt,
  Enabled: boolean
): set_SwapBack {
  let setSwapBackEvent = changetype<set_SwapBack>(newMockEvent())

  setSwapBackEvent.parameters = new Array()

  setSwapBackEvent.parameters.push(
    new ethereum.EventParam("Amount", ethereum.Value.fromUnsignedBigInt(Amount))
  )
  setSwapBackEvent.parameters.push(
    new ethereum.EventParam("Enabled", ethereum.Value.fromBoolean(Enabled))
  )

  return setSwapBackEvent
}

export function createuser_TxExemptEvent(
  Wallet: Address,
  Exempt: boolean
): user_TxExempt {
  let userTxExemptEvent = changetype<user_TxExempt>(newMockEvent())

  userTxExemptEvent.parameters = new Array()

  userTxExemptEvent.parameters.push(
    new ethereum.EventParam("Wallet", ethereum.Value.fromAddress(Wallet))
  )
  userTxExemptEvent.parameters.push(
    new ethereum.EventParam("Exempt", ethereum.Value.fromBoolean(Exempt))
  )

  return userTxExemptEvent
}

export function createuser_exemptfromfeesEvent(
  Wallet: Address,
  Exempt: boolean
): user_exemptfromfees {
  let userExemptfromfeesEvent = changetype<user_exemptfromfees>(newMockEvent())

  userExemptfromfeesEvent.parameters = new Array()

  userExemptfromfeesEvent.parameters.push(
    new ethereum.EventParam("Wallet", ethereum.Value.fromAddress(Wallet))
  )
  userExemptfromfeesEvent.parameters.push(
    new ethereum.EventParam("Exempt", ethereum.Value.fromBoolean(Exempt))
  )

  return userExemptfromfeesEvent
}
