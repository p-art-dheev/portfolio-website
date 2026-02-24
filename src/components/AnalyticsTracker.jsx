import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function AnalyticsTracker() {
    const location = useLocation();

    useEffect(() => {
        // Fire and forget analytics event
        fetch('/api/analytics/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: location.pathname }),
        }).catch(() => {
            // Ignore network errors silently for analytics
        });
    }, [location.pathname]);

    return null;
}
