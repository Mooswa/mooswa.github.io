async function sendPurchaseEmail() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const size = document.getElementById("size").value;
    const cover = document.getElementById("cover").value;
    const page_amount = document.getElementById("page-ammount").value;
    const format = document.getElementById("format").value;
    const orientation = document.getElementById("orientation").value;
    const quantity = document.getElementById("quantity").value;
    if (!name || !email || !size || !cover || !page_amount || page_amount < 16 || page_amount > 80 || !format || !orientation || !quantity || quantity < 1) {
        alert("Completa todos los campos antes de enviar el pedido.");
        return;
    }
    document.getElementById("send-request").textContent = "Enviando...";
    await emailjs.send(
        "service_t7zdcav",
        "template_ogip6fb",
        {
            client: name,
            email: email,
            size: size,
            cover: cover,
            page_amount: document.getElementById("page-ammount").value,
            has_spiral: document.getElementById("spiral").value,
            format: format,
            orientation: orientation,
            quantity: document.getElementById("quantity").value
        },
        "PQMcpg_IlfZb_5Qi2"
    ).then(
        function(response) {
            document.getElementById("send-request").textContent = "✓ Su pedido ha sido enviado";
            alert("Su pedido ha sido enviado exitosamente. ¡Nos pondremos en contacto con usted pronto!");
        },
        function(error) {
            document.getElementById("send-request").textContent = "Error :(";
            alert("Hubo un error al enviar su pedido. Por favor, inténtelo de nuevo más tarde.");
        }
    );
}

async function sendOrderEmail() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const text = document.getElementById("order-text").value.trim();
    const selectedFile = document.getElementById("file-upload").files[0];
    const button = document.getElementById("send-request");
    if (!name || !email || !text) {
        alert("Completa todos los campos antes de enviar el pedido.");
        return;
    }
    let fileLink = "No se adjuntó ningún archivo";
    try {
        if (selectedFile) {
            button.textContent = "Subiendo archivo...";
            const uploadData = new FormData();
            uploadData.append("file", selectedFile);
            uploadData.append("upload_preset", "mooswa-order-reference-file");
            const uploadResponse = await fetch(
                "https://api.cloudinary.com/v1_1/lfhgcebk/auto/upload",
                {
                    method: "POST",
                    body: uploadData
                }
            );
                if (!uploadResponse.ok) {
                    button.textContent = "Error :(";
                    alert("Hubo un error al subir el archivo. Por favor, inténtelo de nuevo más tarde.");
                    return;
                }
            const uploadedFile = await uploadResponse.json();
            fileLink = uploadedFile.secure_url;
        }
        button.textContent = "Enviando...";
        await emailjs.send(
            "service_t7zdcav",
            "template_cg3ohmi",
            {
                client: name,
                email: email,
                message: text,
                file_link: fileLink
            },
            "PQMcpg_IlfZb_5Qi2"
        ).then(
            function(response) {
                document.getElementById("send-request").textContent = "✓ Su pedido ha sido enviado";
                alert("Su pedido ha sido enviado exitosamente. ¡Nos pondremos en contacto con usted pronto!");
            },
            function(error) {
                document.getElementById("send-request").textContent = "Error :(";
                alert("Hubo un error al enviar su pedido. Por favor, inténtelo de nuevo más tarde.");
            }
        );

    } catch (error) {
        console.error(error);
        button.textContent = "Error :(";
        alert("Hubo un error al procesar el pedido. Por favor, inténtelo de nuevo más tarde.");
    }
}