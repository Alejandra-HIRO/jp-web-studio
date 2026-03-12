// Formulario para whatsapp llegara con romario
document.addEventListener('DOMContentLoaded', function() {

    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const phone = document.getElementById('phone')?.value.trim();
            const empresa = document.getElementById('empresa')?.value.trim();
            const service = document.getElementById('service')?.value;
            const message = document.getElementById('message')?.value.trim();
            
            if (!name || !email || !phone || !empresa || !service) {
                alert('❌ Por favor completa todos los campos requeridos.');
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                alert('❌ Por favor ingresa un email válido.');
                return;
            }
            
            const phoneDigits = phone.replace(/\D/g, '');
            if (phoneDigits.length < 10) {
                alert('❌ Por favor ingresa un teléfono válido (10 dígitos).');
                return;
            }
            
            const serviceSelect = document.getElementById('service');
            const serviceText = serviceSelect.options[serviceSelect.selectedIndex]?.text || 'No especificado';
            
            let whatsappMessage = `Hola, soy *${name}*.%0A%0A`;
            whatsappMessage += `*Email:* ${email}%0A`;
            whatsappMessage += `*Teléfono:* ${phone}%0A`;
            whatsappMessage += `*Empresa:* ${empresa}%0A`;
            whatsappMessage += `*Solución de interés:* ${serviceText}%0A`;
            
            if (message) {
                whatsappMessage += `%0A💬 *Mensaje:*%0A${message}`;
            }
            
            const whatsappNumber = '8123519691'; // Numero a donde llegara el mensaje
            const url = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
            
            window.open(url, '_blank');
            alert('✅ ¡Gracias por contactarnos! Serás redirigido a WhatsApp.');
            this.reset();
        });
    }
    
});