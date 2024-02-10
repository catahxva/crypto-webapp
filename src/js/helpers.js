export const getJSON = async function (url, options) {
  try {
    const res = await fetch(url, options);

    if (!res.status) throw new Error("There was an error in getting your data");

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};

export const formatCurrency = function (
  number,
  currency,
  userLocale = navigator.language ? navigator.language : "en-US"
) {
  const options = {
    style: "currency",
    currency,
  };

  return new Intl.NumberFormat(userLocale, options).format(number);
};

export const formatNumber = function (
  number,
  userLocale = navigator.language ? navigator.language : "en-US"
) {
  const options = {
    style: "decimal",
  };

  return new Intl.NumberFormat(userLocale, options).format(number);
};

export const formatDate = function (
  timeStamp,
  userLocale = navigator.language ? navigator.language : "en-US"
) {
  const date = new Date(timeStamp * 1000);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat(userLocale, options).format(date);
};

export const persistLocalStorage = function (itemName, itemValue) {
  localStorage.setItem(itemName, itemValue);
};

export const getPricesAndDates = function (arr, time) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const nthElement = time === "24h" ? 11 : 24;

  const coinPrices = arr
    .map((el) => Number(el.price))
    .filter((_, i) => i % nthElement === 0)
    .reverse();

  let coinTimeStamps;

  if (time === "24h") {
    coinTimeStamps = [
      ...new Set(
        arr.map(
          (el) =>
            `${String(new Date(el.timestamp * 1000).getHours()).padStart(
              2,
              0
            )}:00`
        )
      ),
    ].reverse();
  }

  if (time === "7d") {
    coinTimeStamps = [
      ...new Set(arr.map((el) => days[new Date(el.timestamp * 1000).getDay()])),
    ].reverse();
  }

  if (time === "30d") {
    coinTimeStamps = [
      ...new Set(
        arr.map(
          (el) =>
            `${String(new Date(el.timestamp * 1000).getDate()).padStart(
              2,
              0
            )}/${String(new Date(el.timestamp * 1000).getMonth() + 1).padStart(
              2,
              0
            )}`
        )
      ),
    ].reverse();
  }

  return [coinPrices, coinTimeStamps];
};
