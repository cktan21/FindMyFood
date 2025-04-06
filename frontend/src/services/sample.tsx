// How you would use it with react
import { useEffect, useState } from 'react';
import { getNotifications, listenForNotifications } from './api';

const App = () => {
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        // Start listening for notifications
        listenForNotifications();

        // Subscribe to the notification stream
        const subscription = getNotifications().subscribe((notification) => {
            setNotifications((prev) => [...prev, notification]); // Append new notifications
        });

        // Cleanup subscription on component unmount
        return () => subscription.unsubscribe();
    }, []);

    return (
        <div>
            <h1>Notifications</h1>
            <ul>
                {notifications.map((notif, index) => (
                    <li key={index}>{notif.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;