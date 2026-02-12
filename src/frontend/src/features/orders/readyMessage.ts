export function getReadyMessageText(customerName: string): string {
  const english = `Your clothes are ready. You can collect them from Adarsh Mens Tailors.\nThank you, visit again.`;
  const marathi = `आपले कपडे तयार झाले आहेत. कृपया Adarsh Mens Tailors मधून घेऊन जा.\nधन्यवाद, पुन्हा भेट द्या.`;
  
  return `Dear ${customerName},\n\n${english}\n\n${marathi}`;
}

export function getWhatsAppLink(mobileNumber: string, message: string): string {
  // Sanitize phone number - remove spaces, dashes, and other non-numeric characters except +
  const sanitizedNumber = mobileNumber.replace(/[^\d+]/g, '');
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // WhatsApp web/app link format: https://wa.me/PHONENUMBER?text=MESSAGE
  return `https://wa.me/${sanitizedNumber}?text=${encodedMessage}`;
}
