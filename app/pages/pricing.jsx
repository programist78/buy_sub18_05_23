// pricing.tsx

import { useState } from 'react';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react';
import CheckoutForm from "../components/CheckoutForm";

export default function PricingPage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [priceId, setPriceId] = useState('');
    const [customer, setCustomer] = useState(undefined);

    // You can get the price ID from the Stripe Dashboard
    async function handleSubscribeClick(priceId) {
        setPriceId(priceId);

        // Call the create customer endpoint with the name and email
        // of the authenticated user.
        // If the user is not authenticated, you can ask them for 
        // the details before calling this endpoint.
        const customerResponse = await fetch(
            '/api/customer',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name })
            }
        );
        const customer = await customerResponse.json();
        setCustomer(customer);
    }

    return (
        <>
            <Button onClick={() => handleSubscribeClick('price_abc123')}>Subscribe Now</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            customer ?
                                <CheckoutForm customerId={customer.id} priceId={priceId} /> :
                                <Spinner />
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
