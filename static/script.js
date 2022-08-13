let stockPrice = 100
let stockQuantity = 1
let tradeHistory = []

const showTradeHistory = () => {
  stockPrice = localStorage.getItem("stockPrice")
    ? parseFloat(localStorage.getItem("stockPrice"))
    : 100
  tradeHistory = localStorage.getItem("tradeHistory")
    ? JSON.parse(localStorage.getItem("tradeHistory"))
    : []

  document.getElementById("showStockPrice").innerHTML = stockPrice
  document.getElementById("stockQuantity").innerHTML = stockQuantity
  const getHisTblele = document.getElementById("showHoldings")
  getHisTblele.innerHTML = ""
  let totalpnl = 0

  tradeHistory.map((hisItem, hisInd) => {
    let newRow = getHisTblele.insertRow()

    let buynsell = newRow.insertCell()
    let intrName = newRow.insertCell()
    let sAvg = newRow.insertCell()
    let sQuantity = newRow.insertCell()
    let profitnloss = newRow.insertCell()
    let actionStock = newRow.insertCell()

    let getpandl = 0

    if (hisItem.placedPrice) {
      if (hisItem.tradeType == 0) {
        getpandl =
          hisItem.placedPrice * hisItem.stockQuantity -
          hisItem.stockPrice * hisItem.stockQuantity
      } else if (hisItem.tradeType == 1) {
        getpandl =
          hisItem.stockPrice * hisItem.stockQuantity -
          hisItem.placedPrice * hisItem.stockQuantity
      }
    } else {
      if (hisItem.tradeType == 0) {
        getpandl =
          stockPrice * hisItem.stockQuantity -
          hisItem.stockPrice * hisItem.stockQuantity
      } else if (hisItem.tradeType == 1) {
        getpandl =
          hisItem.stockPrice * hisItem.stockQuantity -
          stockPrice * hisItem.stockQuantity
      }
    }

    totalpnl = +totalpnl + getpandl

    buynsell.innerHTML = hisItem.tradeType == 0 ? "B" : "S"
    buynsell.style.color = hisItem.tradeType == 0 ? "green" : "red"
    intrName.innerHTML = hisItem.instrName
    sAvg.innerHTML = hisItem.stockPrice
    sQuantity.innerHTML = hisItem.stockQuantity
    profitnloss.innerHTML = `${getpandl > 0 ? "+" : ""}${getpandl}`
    profitnloss.style.color = `${
      getpandl > 0 ? "green" : getpandl < 0 ? "red" : ""
    }`
    profitnloss.style.fontWeight = "bold"

    if (hisItem.placedPrice) {
      actionStock.innerHTML = `${hisItem.tradeType == 0 ? "Sell" : "Buy"}`
      actionStock.style.color = `${hisItem.tradeType == 0 ? "red" : "green"}`
    } else {
      actionStock.innerHTML = `<button class="btn btn-${
        hisItem.tradeType == 0 ? "danger" : "success"
      } btn-sm m-0" type="button"> ${
        hisItem.tradeType == 0 ? "Sell" : "Buy"
      } </button>`
      actionStock.addEventListener("click", () => {
        tradeHistory[hisInd].placedPrice = stockPrice
      })
    }
  })

  let totalInvestedEle = document.getElementById("totalInvested")
  totalInvestedEle.innerHTML = tradeHistory.reduce((a, b) => {
    return a + b.stockPrice * b.stockQuantity
  }, 0)

  let getTotalpnlEle = document.getElementById("totalpnl")
  getTotalpnlEle.innerHTML = `${totalpnl > 0 ? "+" : ""}${totalpnl}`
  getTotalpnlEle.style.color = `${
    totalpnl > 0 ? "green" : totalpnl < 0 ? "red" : ""
  }`
}

window.onload = function () {
  showTradeHistory()
}

const resetTrade = () => {
  let text = "Are you sure you want to reset?"
  if (confirm(text) == true) {
    localStorage.clear()
    stockQuantity = 1
    showTradeHistory()
  } else {
  }
}

const increaseStockPrice = () => {
  stockPrice = stockPrice + 1
  localStorage.setItem("stockPrice", stockPrice)
  document.getElementById("showStockPrice").innerHTML = stockPrice
  showTradeHistory()
}

const decreaseStockPrice = () => {
  if (stockPrice > 1) {
    stockPrice = stockPrice - 1
    localStorage.setItem("stockPrice", stockPrice)
    document.getElementById("showStockPrice").innerHTML = stockPrice
    showTradeHistory()
  }
}

const increaseStockQuantity = () => {
  stockQuantity = stockQuantity + 1
  document.getElementById("stockQuantity").innerHTML = stockQuantity
}

const decreaseStockQuantity = () => {
  if (stockQuantity > 1) {
    stockQuantity = stockQuantity - 1
    document.getElementById("stockQuantity").innerHTML = stockQuantity
  }
}

const swithcToTradeBook = () => {
  document.getElementById("tradeSection").style.display = "none"
  document.getElementById("calSection").style.display = "initial"
}

const swithcToCalculator = () => {
  document.getElementById("tradeSection").style.display = "initial"
  document.getElementById("calSection").style.display = "none"
}

const buyTradeFun = () => {
  tradeHistory.push({
    instrName: "Sbi",
    stockPrice: stockPrice,
    stockQuantity: stockQuantity,
    tradeType: 0,
  })
  localStorage.setItem("tradeHistory", JSON.stringify(tradeHistory))

  showTradeHistory()
}

const sellTradeFun = () => {
  tradeHistory.push({
    instrName: "Sbi",
    stockPrice: stockPrice,
    stockQuantity: stockQuantity,
    tradeType: 1,
  })
  localStorage.setItem("tradeHistory", JSON.stringify(tradeHistory))

  showTradeHistory()
}

const autoTradeFuc = (rowRecord) => {
  //   console.log(rowRecord)

  if (rowRecord.length) {
    let tradeCount = 0
    let showRecordData = document.getElementById("showRecord")

    rowRecord.map((hisVal, hisInd) => {
      if (hisVal.instrData.length) {
        let newRow = showRecordData.insertRow()

        let indexCell = newRow.insertCell()
        let instrCell = newRow.insertCell()
        let dateCell = newRow.insertCell()
        let openCell = newRow.insertCell()
        let lowCell = newRow.insertCell()
        let highCell = newRow.insertCell()
        let closeCell = newRow.insertCell()
        let volumeCell = newRow.insertCell()

        indexCell.innerHTML = `${hisInd + 1}`
        instrCell.innerHTML = hisVal.instrName

        setInterval(() => {
          dateCell.innerHTML = new Date(
            hisVal.instrData[tradeCount][0]
          ).toLocaleTimeString()
          openCell.innerHTML = parseFloat(
            hisVal.instrData[tradeCount][1]
          ).toFixed(2)
          lowCell.innerHTML = parseFloat(
            hisVal.instrData[tradeCount][3]
          ).toFixed(2)
          highCell.innerHTML = parseFloat(
            hisVal.instrData[tradeCount][2]
          ).toFixed(2)
          closeCell.innerHTML = parseFloat(
            hisVal.instrData[tradeCount][4]
          ).toFixed(2)
          volumeCell.innerHTML = parseFloat(
            hisVal.instrData[tradeCount][5]
          ).toFixed(2)

          tradeCount = tradeCount + 1
        }, 2000)
      }
    })
  }
}
