const SaveTransaction = async ({ user, food, totalPrice, transactionUuid, method, status, saveTransactionToFirebase }) => {
    try {
      await saveTransactionToFirebase(user.uid, {
        food: food,
        amount: totalPrice,
        transactionUuid: transactionUuid,
        status: status,
        method: method,
        date: new Date().toISOString().slice(0, 10),
      });
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };
  
  export default SaveTransaction;
  