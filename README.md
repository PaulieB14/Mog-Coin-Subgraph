# **MOG Subgraph Documentation**


This repository provides a subgraph for the **MOG Token** on the Ethereum blockchain. The subgraph indexes and exposes blockchain data for activities related to the MOG token, including transfers, approvals, ownership changes, fee exemptions, and more. This data is valuable for analytics, transparency, and understanding token interactions.

---

## **Details**

- **Token Contract**: [0xaaeE1A9723aaDB7afA2810263653A34bA2C21C7a](https://etherscan.io/token/0xaaeE1A9723aaDB7afA2810263653A34bA2C21C7a)
- **Network**: Ethereum Mainnet
- **Use Cases**:  
  - Monitor token transfers and interactions.  
  - Identify top holders and analyze balance changes.  
  - Track ownership changes and market maker settings.  
  - Analyze transaction patterns for large-value transfers.  
  - Enable transparency for the MOG community.

---

# Subgraph Example Queries**

This document provides example GraphQL queries for interacting with the **MOG Subgraph**. Use these queries to fetch data about transfers, holders, transaction limits, and more.

```graphql
# Recent Transfers
# Retrieve the most recent token transfers on the MOG contract.
{
  transfers(first: 5, orderBy: blockTimestamp, orderDirection: desc) {
    id
    from {
      id
    }
    to {
      id
    }
    value
    blockNumber
    blockTimestamp
    transactionHash
  }
}
```

# Set Maximum Transaction Limit Events
# Fetch events where the maximum transaction limit was updated.
{
  set_MaxTXs(first: 5, orderBy: blockTimestamp, orderDirection: desc) {
    id
    maxTX
    blockTimestamp
    transactionHash
  }
}

# Top Holders
# List the top 10 holders of the MOG token, ordered by balance.
{
  users(first: 10, orderBy: balance, orderDirection: desc) {
    id
    balance
    isExemptFromFees
    isExemptFromTxLimit
  }
}

# Transfers Between Two Addresses
# Retrieve all transfers between two specific addresses.
{
  transfers(
    where: { from: "0xAddress1", to: "0xAddress2" }
    orderBy: blockTimestamp
    orderDirection: desc
  ) {
    id
    value
    blockTimestamp
    transactionHash
  }
}

# High-Value Transfers
# Fetch all transfers with a value greater than 1 MOG (expressed in Wei).
{
  transfers(where: { value_gt: "1000000000000000000" }, orderBy: value, orderDirection: desc) {
    id
    from {
      id
    }
    to {
      id
    }
    value
    blockTimestamp
  }
}


### **Ownership History**
```graphql
{
  ownershipTransferreds(orderBy: blockTimestamp, orderDirection: asc) {
    id
    previousOwner
    newOwner
    blockTimestamp
    transactionHash
  }
}
