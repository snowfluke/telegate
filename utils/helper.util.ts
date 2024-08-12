export class Helper {
  isValidBase64(str: string): boolean {
    const base64Regex =
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    return base64Regex.test(str);
  }

  isValidId(str: string): boolean {
    const usernameRegex = /^(?:@[\w\d_]{5,32}|\+62[0-9]{5,15})$/;
    return usernameRegex.test(str);
  }

  delay(minMs = 3000, rangeMs = 2000) {
    const randomTime = Math.floor(Math.random() * rangeMs);
    return new Promise((resolve) => {
      setTimeout(resolve, minMs + randomTime);
    });
  }
}
