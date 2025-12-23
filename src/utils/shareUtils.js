/**
 * Share utilities for encoding/decoding and sharing notes/containers
 */

/**
 * Encode data to URL-safe Base64
 */
export function encodeShareData(data, type = 'note') {
    const shareObject = {
        v: '1.0',
        type: type,
        data: data,
        timestamp: Date.now()
    };

    try {
        const jsonString = JSON.stringify(shareObject);
        // URL-safe Base64 encoding
        const base64 = btoa(encodeURIComponent(jsonString));
        return base64;
    } catch (error) {
        console.error('Error encoding share data:', error);
        return null;
    }
}

/**
 * Decode URL-safe Base64 to data object
 */
export function decodeShareData(encodedData) {
    try {
        const jsonString = decodeURIComponent(atob(encodedData));
        const shareObject = JSON.parse(jsonString);

        // Validate structure
        if (!shareObject.v || !shareObject.type || !shareObject.data) {
            throw new Error('Invalid share data structure');
        }

        return shareObject;
    } catch (error) {
        console.error('Error decoding share data:', error);
        return null;
    }
}

/**
 * Generate shareable URL
 */
export function generateShareUrl(data, type = 'note') {
    const encoded = encodeShareData(data, type);
    if (!encoded) return null;

    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?import=${encoded}`;

    // Warn if URL is too long
    if (shareUrl.length > 2000) {
        console.warn('Share URL is very long. May have compatibility issues.');
    }

    return shareUrl;
}

/**
 * Share data using Share API or clipboard fallback
 */
export async function shareData(data, type = 'note', title = 'Compartir') {
    const shareUrl = generateShareUrl(data, type);

    if (!shareUrl) {
        return { success: false, message: 'Error generando link' };
    }

    // Prepare share data
    const sharePayload = {
        title: title,
        url: shareUrl
    };

    // Add text description if it's a note
    if (type === 'note' && data.title) {
        sharePayload.text = `${data.title}${data.description ? '\n' + data.description : ''}`;
    } else if (type === 'container' && data.notes) {
        sharePayload.text = `${title} - ${data.notes.length} tareas`;
    }

    // Try Share API first (mobile)
    if (navigator.share && isMobileDevice()) {
        try {
            await navigator.share(sharePayload);
            return { success: true, message: 'Compartido exitosamente' };
        } catch (error) {
            // User cancelled or error
            if (error.name === 'AbortError') {
                return { success: false, message: 'Compartir cancelado' };
            }
            console.error('Share API error:', error);
            // Fall through to clipboard
        }
    }

    // Fallback: copy to clipboard (desktop)
    try {
        await navigator.clipboard.writeText(shareUrl);
        return { success: true, message: 'Link copiado al portapapeles', copied: true };
    } catch (error) {
        console.error('Clipboard error:', error);
        return { success: false, message: 'Error copiando link' };
    }
}

/**
 * Check if device is mobile
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Validate imported data structure
 */
export function validateImportData(shareObject) {
    if (!shareObject || typeof shareObject !== 'object') {
        return { valid: false, error: 'Datos inválidos' };
    }

    if (shareObject.v !== '1.0') {
        return { valid: false, error: 'Versión no compatible' };
    }

    if (shareObject.type === 'note') {
        const { data } = shareObject;
        if (!data.title || !data.category) {
            return { valid: false, error: 'Nota incompleta' };
        }
    } else if (shareObject.type === 'container') {
        const { data } = shareObject;
        if (!data.notes || !Array.isArray(data.notes)) {
            return { valid: false, error: 'Contenedor inválido' };
        }
    } else {
        return { valid: false, error: 'Tipo desconocido' };
    }

    return { valid: true };
}
