document.addEventListener("DOMContentLoaded", () => {
    const pedidoForm = document.getElementById("pedidoForm");
    const productoSelect = document.getElementById("producto");
    const stockList = document.getElementById("stockList");

    // Cargar productos desde la API
    async function cargarProductos() {
        try {
            const response = await fetch("http://localhost:3000/api/productos");

            if (!response.ok) {
                throw new Error(`Error al cargar productos: ${response.statusText}`);
            }

            const productos = await response.json();

            productoSelect.innerHTML = "";
            stockList.innerHTML = "";

            productos.forEach(producto => {
                let option = document.createElement("option");
                option.value = producto.id;
                option.textContent = `${producto.nombre} (Stock: ${producto.stock})`;
                productoSelect.appendChild(option);

                let listItem = document.createElement("li");
                listItem.textContent = `${producto.nombre}: ${producto.stock} disponibles`;
                stockList.appendChild(listItem);
            });
        } catch (error) {
            console.error("Error al cargar productos:", error);
            alert("Error al cargar productos. Revisa la consola.");
        }
    }

    // Manejar pedido
    pedidoForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const productoId = productoSelect.value;
        const cantidad = document.getElementById("cantidad").value;

        try {
            const response = await fetch('http://localhost:3000/api/pedidos', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productoId, cantidad })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Pedido realizado con éxito");
                cargarProductos(); // Actualizar stock en tiempo real
            } else {
                console.error("Error en la respuesta del servidor:", data);
                alert("No se pudo realizar el pedido. " + (data.message || "Error desconocido"));
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Error en la solicitud: " + error.message);
        }
    });

    // Cargar productos al cargar la página
    cargarProductos();
});
