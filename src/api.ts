export const apiCall = async (): Promise<number> => {
  return new Promise((resolve, reject) => {
    const success = Math.round(Math.random());

    setTimeout(
      () => (success ? resolve(20) : reject(new Error("API error"))),
      2000
    );
  });
};
