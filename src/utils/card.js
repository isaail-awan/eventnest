export function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

export function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return digits.slice(0, 2) + "/" + digits.slice(2);
}

export function detectCardBrand(digits) {
  if (/^4/.test(digits)) return "Visa";
  if (/^5[1-5]/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "Amex";
  return "Card";
}

export function validatePayment(form) {
  const errors = {};
  const digits = form.cardNumber.replace(/\s/g, "");

  if (digits.length !== 16) errors.cardNumber = "Enter a valid 16-digit card number.";

  if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
    errors.expiry = "Use MM/YY format.";
  } else {
    const [mm, yy] = form.expiry.split("/").map(Number);
    if (mm < 1 || mm > 12) errors.expiry = "Enter a valid month.";
    else {
      const now = new Date();
      const currentYY = now.getFullYear() % 100;
      const currentMM = now.getMonth() + 1;
      if (yy < currentYY || (yy === currentYY && mm < currentMM)) errors.expiry = "This card has expired.";
    }
  }

  if (!/^\d{3,4}$/.test(form.cvv)) errors.cvv = "Enter a valid CVV.";
  if (form.cardName.trim().length < 3) errors.cardName = "Enter the name on the card.";

  return errors;
}