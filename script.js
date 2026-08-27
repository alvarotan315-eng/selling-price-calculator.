const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const result = document.getElementById("result");

const costPriceInput = document.getElementById("costPrice");
const packagingCostInput = document.getElementById("packagingCost");
const otherCostInput = document.getElementById("otherCost");
const platformFeeInput = document.getElementById("platformFee");
const profitTargetInput = document.getElementById("profitTarget");

const sellingPriceOutput = document.getElementById("sellingPrice");
const totalCostOutput = document.getElementById("totalCost");
const platformCostOutput = document.getElementById("platformCost");
const profitAmountOutput = document.getElementById("profitAmount");
const profitMarginOutput = document.getElementById("profitMargin");
const markupOutput = document.getElementById("markup");

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}

calculateBtn.addEventListener("click", function () {

  const costPrice = Number(costPriceInput.value) || 0;
  const packagingCost = Number(packagingCostInput.value) || 0;
  const otherCost = Number(otherCostInput.value) || 0;
  const platformFee = Number(platformFeeInput.value) || 0;
  const profitTarget = Number(profitTargetInput.value) || 0;

  if (costPrice <= 0) {
    alert("Masukkan Harga Modal / HPP terlebih dahulu.");
    return;
  }

  const totalCost =
    costPrice +
    packagingCost +
    otherCost;

  const platformRate = platformFee / 100;
  const profitRate = profitTarget / 100;

  const denominator =
    1 -
    platformRate -
    profitRate;

  if (denominator <= 0) {
    alert(
      "Biaya admin dan target keuntungan terlalu besar. " +
      "Gabungan keduanya harus kurang dari 100%."
    );
    return;
  }

  const sellingPrice = totalCost / denominator;

  const platformCost =
    sellingPrice * platformRate;

  const profitAmount =
    sellingPrice -
    totalCost -
    platformCost;

  const profitMargin =
    (profitAmount / sellingPrice) * 100;

  const markup =
    (profitAmount / totalCost) * 100;

  sellingPriceOutput.textContent =
    formatRupiah(Math.ceil(sellingPrice / 100) * 100);

  totalCostOutput.textContent =
    formatRupiah(totalCost);

  platformCostOutput.textContent =
    formatRupiah(platformCost);

  profitAmountOutput.textContent =
    formatRupiah(profitAmount);

  profitMarginOutput.textContent =
    profitMargin.toFixed(1) + "%";

  markupOutput.textContent =
    markup.toFixed(1) + "%";

  result.classList.remove("hidden");

  result.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

resetBtn.addEventListener("click", function () {

  document.getElementById("productName").value = "";
  costPriceInput.value = "";
  packagingCostInput.value = "";
  otherCostInput.value = "";
  platformFeeInput.value = "";
  profitTargetInput.value = "";

  result.classList.add("hidden");
});
