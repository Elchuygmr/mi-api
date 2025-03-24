document.addEventListener("DOMContentLoaded", () => {
    const agregarProductoForm = document.getElementById("agregarProductoForm");
    const productosList = document.getElementById("productosList");

    // Cargar productos desde la API
    async function cargarProductos() {
        try {
            const response = await fetch('http://localhost:3000/api/productos');
            if (!response.ok) throw new Error("Error al obtener productos");

            const productos = await response.json();
            productosList.innerHTML = "";

            productos.forEach(producto => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${producto.nombre}</td>
                    <td>${producto.stock}</td>
                    <td>
                        <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                        <button onclick="modificarProducto(${producto.id}, '${producto.nombre}')">Modificar</button>
                    </td>
                `;
                productosList.appendChild(row);
            });
        } catch (error) {
            console.error("Error al cargar productos:", error);
            alert("No se pudo cargar la lista de productos.");
        }
    }

    // Agregar producto
    agregarProductoForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const stock = document.getElementById("stock").value;

        try {
            const response = await fetch('http://localhost:3000/api/productos', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, stock })
            });

            if (!response.ok) throw new Error("Error al agregar el producto");

            alert("Producto agregado exitosamente");
            agregarProductoForm.reset();
            cargarProductos();
        } catch (error) {
            console.error(error);
            alert("Error al agregar el producto.");
        }
    });

    // Eliminar producto
    window.eliminarProducto = async (id) => {
        if (confirm("¿Seguro que deseas eliminar este producto?")) {
            try {
                const response = await fetch(`http://localhost:3000/api/productos/${id}`, {
                    method: "DELETE"
                });

                if (!response.ok) throw new Error("Error al eliminar el producto");

                alert("Producto eliminado");
                cargarProductos();
            } catch (error) {
                console.error(error);
                alert("No se pudo eliminar el producto.");
            }
        }
    };

    // Modificar producto
    window.modificarProducto = async (id, nombreActual) => {
        const nuevoStock = prompt("Ingrese el nuevo stock:");

        if (nuevoStock !== null) {
            try {
                const response = await fetch(`http://localhost:3000/api/productos/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre: nombreActual, stock: nuevoStock })
                });

                if (!response.ok) throw new Error("Error al actualizar el producto");

                alert("Producto actualizado");
                cargarProductos();
            } catch (error) {
                console.error(error);
                alert("No se pudo actualizar el producto.");
            }
        }
    };

    cargarProductos();
});
