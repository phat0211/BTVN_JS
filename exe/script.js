
document.addEventListener('DOMContentLoaded', function() {
    const tabProduct = document.getElementById('tab-product');
    const tabCategory = document.getElementById('tab-category');
    const contentProduct = document.getElementById('content-product');
    const contentCategory = document.getElementById('content-category');
    if (tabProduct && tabCategory && contentProduct && contentCategory) {
        tabProduct.onclick = function() {
            this.classList.add('active');
            tabCategory.classList.remove('active');
            contentProduct.classList.add('active');
            contentCategory.classList.remove('active');
        };
        tabCategory.onclick = function() {
            this.classList.add('active');
            tabProduct.classList.remove('active');
            contentCategory.classList.add('active');
            contentProduct.classList.remove('active');
        };
    }

    const CATEGORY_KEY = 'categories';
    function getCategories() {
        return JSON.parse(localStorage.getItem(CATEGORY_KEY)) || [];
    }
    function saveCategories(categories) {
        localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));
    }
    function ensureDefaultCategories() {
        if (!localStorage.getItem(CATEGORY_KEY)) {
            const defaults = [
                { name: 'Mỹ phẩm', quantity: 0 },
                { name: 'Điện tử', quantity: 0 },
                { name: 'Thời trang', quantity: 0 },
                { name: 'Trang sức', quantity: 0 }
            ];
            saveCategories(defaults);
        }
    }
    function showError(input, message) {
        let err = input.parentElement.querySelector('.input-error');
        if (!err) {
            err = document.createElement('div');
            err.className = 'input-error';
            err.style.color = 'red';
            err.style.fontSize = '13px';
            err.style.marginTop = '2px';
            input.parentElement.appendChild(err);
        }
        err.textContent = message;
        err.style.display = '';
    }
    function clearError(input) {
        let err = input.parentElement.querySelector('.input-error');
        if (err) err.style.display = 'none';
    }
    function setEditing(form, editing) {
        if (editing) {
            form.classList.add('editing');
            form.style.border = '2px solid #007bff';
            form.style.background = '#f0f8ff';
        } else {
            form.classList.remove('editing');
            form.style.border = '';
            form.style.background = '';
        }
    }
    if (document.getElementById('category-form')) {
        const form = document.getElementById('category-form');
        ensureDefaultCategories();
        renderCategories();
        function renderCategories() {
            const categories = getCategories();
            const tbody = document.querySelector('#category-table tbody');
            tbody.innerHTML = '';
            categories.forEach((cat, idx) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${cat.name}</td>
                    <td>${cat.quantity}</td>
                    <td>
                        <button onclick="editCategory(${idx})">Sửa</button>
                        <button onclick="deleteCategory(${idx})">Xoá</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }
        function resetForm() {
            document.getElementById('category-id').value = '';
            document.getElementById('category-name').value = '';
            document.getElementById('category-quantity').value = '';
            form.querySelector('button[type="submit"]').textContent = 'Thêm danh mục';
            document.getElementById('cancel-edit').style.display = 'none';
            setEditing(form, false);
            clearError(document.getElementById('category-name'));
            clearError(document.getElementById('category-quantity'));
        }
        form.onsubmit = function(e) {
            e.preventDefault();
            const id = document.getElementById('category-id').value;
            const nameInput = document.getElementById('category-name');
            const quantityInput = document.getElementById('category-quantity');
            const name = nameInput.value.trim();
            const quantity = parseInt(quantityInput.value, 10);
            let hasError = false;
            clearError(nameInput);
            clearError(quantityInput);
            if (!name || name.length > 255) {
                showError(nameInput, 'Tên danh mục không được để trống và tối đa 255 ký tự.');
                hasError = true;
            }
            if (isNaN(quantity) || quantity < 0) {
                showError(quantityInput, 'Số lượng phải là số >= 0.');
                hasError = true;
            }
            if (hasError) return;
            let categories = getCategories();
            if (id) {
                categories[id] = { name, quantity };
            } else {
                categories.push({ name, quantity });
            }
            saveCategories(categories);
            renderCategories();
            resetForm();
        };
        document.getElementById('category-name').addEventListener('input', function() {
            clearError(this);
        });
        document.getElementById('category-quantity').addEventListener('input', function() {
            clearError(this);
        });
        window.editCategory = function(idx) {
            const categories = getCategories();
            const cat = categories[idx];
            document.getElementById('category-id').value = idx;
            document.getElementById('category-name').value = cat.name;
            document.getElementById('category-quantity').value = cat.quantity;
            form.querySelector('button[type="submit"]').textContent = 'Cập nhật';
            document.getElementById('cancel-edit').style.display = '';
            setEditing(form, true);
        };
        window.deleteCategory = function(idx) {
            if (confirm('Bạn có chắc muốn xoá danh mục này?')) {
                let categories = getCategories();
                categories.splice(idx, 1);
                saveCategories(categories);
                renderCategories();
                resetForm();
            }
        };
        document.getElementById('cancel-edit').onclick = function() {
            resetForm();
        };
    }

    const PRODUCT_KEY = 'products';
    function getProducts() {
        return JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];
    }
    function saveProducts(products) {
        localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
    }
    if (document.getElementById('product-form')) {
        const form = document.getElementById('product-form');
        renderCategoryOptions();
        renderProducts();
        function renderCategoryOptions() {
            const select = document.getElementById('product-category');
            const categories = getCategories();
            select.innerHTML = '';
            if (categories.length === 0) {
                select.disabled = true;
                select.innerHTML = '<option>Không có danh mục</option>';
                form.querySelectorAll('input, textarea, button').forEach(e => e.disabled = true);
                return;
            }
            select.disabled = false;
            form.querySelectorAll('input, textarea, button').forEach(e => e.disabled = false);
            categories.forEach((cat, idx) => {
                const opt = document.createElement('option');
                opt.value = idx;
                opt.textContent = cat.name;
                select.appendChild(opt);
            });
        }
        function renderProducts() {
            const products = getProducts();
            const categories = getCategories();
            const tbody = document.querySelector('#product-table tbody');
            tbody.innerHTML = '';
            products.forEach((prod, idx) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${prod.name}</td>
                    <td>${prod.price}</td>
                    <td>${categories[prod.category] ? categories[prod.category].name : ''}</td>
                    <td>${prod.description || ''}</td>
                    <td>
                        <button onclick="editProduct(${idx})">Sửa</button>
                        <button onclick="deleteProduct(${idx})">Xoá</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }
        function resetForm() {
            document.getElementById('product-id').value = '';
            document.getElementById('product-name').value = '';
            document.getElementById('product-price').value = '';
            document.getElementById('product-category').selectedIndex = 0;
            document.getElementById('product-description').value = '';
            form.querySelector('button[type="submit"]').textContent = 'Thêm sản phẩm';
            document.getElementById('cancel-edit').style.display = 'none';
            setEditing(form, false);
            clearError(document.getElementById('product-name'));
            clearError(document.getElementById('product-price'));
            clearError(document.getElementById('product-description'));
        }
        form.onsubmit = function(e) {
            e.preventDefault();
            const id = document.getElementById('product-id').value;
            const nameInput = document.getElementById('product-name');
            const priceInput = document.getElementById('product-price');
            const category = parseInt(document.getElementById('product-category').value, 10);
            const descriptionInput = document.getElementById('product-description');
            const name = nameInput.value.trim();
            const price = parseFloat(priceInput.value);
            const description = descriptionInput.value.trim();
            let hasError = false;
            clearError(nameInput);
            clearError(priceInput);
            clearError(descriptionInput);
            if (!name || name.length > 255) {
                showError(nameInput, 'Tên sản phẩm không được để trống và tối đa 255 ký tự.');
                hasError = true;
            }
            if (isNaN(price) || price < 0) {
                showError(priceInput, 'Giá phải là số >= 0.');
                hasError = true;
            }
            if (description.length > 500) {
                showError(descriptionInput, 'Mô tả tối đa 500 ký tự.');
                hasError = true;
            }
            if (hasError) return;
            let products = getProducts();
            if (id) {
                products[id] = { name, price, category, description };
            } else {
                products.push({ name, price, category, description });
            }
            saveProducts(products);
            renderProducts();
            resetForm();
        };
        document.getElementById('product-name').addEventListener('input', function() {
            clearError(this);
        });
        document.getElementById('product-price').addEventListener('input', function() {
            clearError(this);
        });
        document.getElementById('product-description').addEventListener('input', function() {
            clearError(this);
        });
        window.editProduct = function(idx) {
            const products = getProducts();
            const prod = products[idx];
            document.getElementById('product-id').value = idx;
            document.getElementById('product-name').value = prod.name;
            document.getElementById('product-price').value = prod.price;
            document.getElementById('product-category').value = prod.category;
            document.getElementById('product-description').value = prod.description;
            form.querySelector('button[type="submit"]').textContent = 'Cập nhật';
            document.getElementById('cancel-edit').style.display = '';
            setEditing(form, true);
        };
        window.deleteProduct = function(idx) {
            if (confirm('Bạn có chắc muốn xoá sản phẩm này?')) {
                let products = getProducts();
                products.splice(idx, 1);
                saveProducts(products);
                renderProducts();
                resetForm();
            }
        };
        document.getElementById('cancel-edit').onclick = function() {
            resetForm();
        };
    }
}); 