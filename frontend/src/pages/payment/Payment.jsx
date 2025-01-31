const handleKhaltiPayment = () => {
    let config = {
        publicKey: "test_public_key_0800545e039d45368cab4d1b2fb93d01",
        productIdentity: "1234567890",
        productName: "Cart Items",
        productUrl: "http://example.com/cart",
        eventHandler: {
            onSuccess(payload) {
                console.log("Khalti success payload:", payload);
                toast.success("Payment Successful!");
                saveOrder("Payment made via Khalti");
            },
            onError(error) {
                console.log("Khalti error:", error);
                toast.error("Payment Failed. Please try again.");
            },
            onClose() {
                console.log('Khalti widget is closing');
            }
        },
        paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
    };

    let checkout = new KhaltiCheckout(config);
    checkout.show({ amount: total * 100 });
};



const handleConfirmOrder = () => {
    if (paymentMethod === 'Khalti') {
        handleKhaltiPayment();
    } else if (paymentMethod === 'COD') {
        const confirmDialog = window.confirm('Do you really want to place the order?');
        if (confirmDialog) {
            saveOrder("Cash on Delivery");
        }
    }
};