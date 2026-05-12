export const validateRegister = ({ 
    username, 
    fullname, 
    email, 
    pass, 
    confirm_password, 
}) => { 
    const errors = {}; 
 
    if (!username) { 
        errors.username = "Vui lòng nhập tên đăng nhập"; 
    } 
 
    if (!fullname) { 
        errors.fullname = "Vui lòng nhập họ ten"; 
    } 
 
    if (!email) { 
        errors.email = "Vui lòng nhập email"; 
    } 
 
    if (!pass) { 
        errors.pass = "Vui lòng nhập mật khẩu"; 
    } else if (pass.length < 6) { 
        errors.pass = "Mật khẩu phải >= 6 ký tự"; 
    } 
 
    if (!confirm_password) { 
        errors.confirm_password = "Vui lòng nhập lại mật khẩu"; 
    } else if (pass !== confirm_password) { 
        errors.confirm_password = "Mật khẩu không khớp"; 
    } 
 
    return errors; 
};

export function isEmpty(obj) {
return Object.keys(obj).length === 0;
}

export const validateLogin = ({ 
    username, 
    pass, 
}) => { 
    const errors = {}; 
 
    if (!username) { 
        errors.username = "Vui lòng nhập tên đăng nhập"; 
    } 
 
    if (!pass) { 
        errors.pass = "Vui lòng nhập mật khẩu"; 
    } 

    return errors; 
};


export const validateProduct = (data) => {
    const errors = {};

    // product_name
    if (!data.product_name || data.product_name.trim() === "") {
        errors.product_name = "Vui lòng nhập tên sản phẩm";
    } else if (data.product_name.length > 100) {
        errors.product_name = "Tên sản phẩm tối đa 100 ký tự";
    }

    // alias
    if (!data.alias || data.alias.trim() === "") {
        errors.alias = "Vui lòng nhập alias";
    } else if (!/^[a-z0-9-]+$/.test(data.alias)) {
        errors.alias = "Alias chỉ chứa chữ thường, số và dấu -";
    } else if (data.alias.length > 100) {
        errors.alias = "Alias tối đa 100 ký tự";
    }

    // cat_id (ép kiểu số)
    const catId = Number(data.cat_id);
    if (!data.cat_id || isNaN(catId) || catId <= 0) {
        errors.cat_id = "Danh mục không hợp lệ";
    }

    // brand_id
    const brandId = Number(data.brand_id);
    if (!data.brand_id || isNaN(brandId) || brandId <= 0) {
        errors.brand_id = "Thương hiệu không hợp lệ";
    }

    // detail (optional)
    if (data.detail && typeof data.detail !== "string") {
        errors.detail = "Mô tả chi tiết không hợp lệ";
    }

    // price
    const price = Number(data.price);
    if (data.price === undefined || data.price === null || data.price === "") {
        errors.price = "Vui lòng nhập giá";
    } else if (isNaN(price) || price < 0) {
        errors.price = "Giá phải lớn hơn hoặc bằng 0";
    }

    // sale_price
    if (data.sale_price !== undefined && data.sale_price !== null && data.sale_price !== "") {
        const salePrice = Number(data.sale_price);
        if (isNaN(salePrice) || salePrice < 0) {
            errors.sale_price = "Giá khuyến mãi không hợp lệ";
        } else if (!isNaN(price) && salePrice > price) {
            errors.sale_price = "Giá khuyến mãi phải nhỏ hơn hoặc bằng giá";
        }
    }

    // trash
    if (data.trash !== undefined && ![0, 1].includes(Number(data.trash))) {
        errors.trash = "Trash chỉ nhận 0 hoặc 1";
    }

    // status
    if (data.status === undefined || ![0, 1].includes(Number(data.status))) {
        errors.status = "Trạng thái không hợp lệ";
    }

    // launch_date
    if (!data.launch_date) {
        errors.launch_date = "Vui lòng nhập ngày ra mắt";
    } else if (isNaN(Date.parse(data.launch_date))) {
        errors.launch_date = "Ngày ra mắt không hợp lệ";
    }

    // tag
    if (!data.tag || data.tag.trim() === "") {
        errors.tag = "Vui lòng nhập tag";
    } else if (data.tag.length > 255) {
        errors.tag = "Tag tối đa 255 ký tự";
    }

    // view
    if (data.view !== undefined) {
        const view = Number(data.view);
        if (!Number.isInteger(view) || view < 0) {
            errors.view = "View phải là số nguyên >= 0";
        }
    }

    // summary
    if (data.summary && data.summary.length > 100) {
        errors.summary = "Mô tả ngắn tối đa 100 ký tự";
    }

    return errors;
};

export const validateCategory = (data) => {
    const errors = {};

    // cat_name
    if (!data.cat_name || data.cat_name.trim() === "") {
        errors.cat_name = "Vui lòng nhập tên danh mục";
    } else if (data.cat_name.length > 100) {
        errors.cat_name = "Tên danh mục tối đa 100 ký tự";
    }

    // alias
    if (!data.alias || data.alias.trim() === "") {
        errors.alias = "Vui lòng nhập alias";
    } else if (!/^[a-z0-9-]+$/.test(data.alias)) {
        errors.alias = "Alias chỉ chứa chữ thường, số và dấu -";
    } else if (data.alias.length > 100) {
        errors.alias = "Alias tối đa 100 ký tự";
    }

    // parent_id (optional, default 0)
    if (data.parent_id !== undefined) {
        const parentId = Number(data.parent_id);
        if (isNaN(parentId) || parentId < 0) {
            errors.parent_id = "Parent ID không hợp lệ";
        }
    }

    // sort_order (optional, default 0)
    if (data.sort_order !== undefined) {
        const sortOrder = Number(data.sort_order);
        if (isNaN(sortOrder) || sortOrder < 0) {
            errors.sort_order = "Thứ tự sắp xếp không hợp lệ";
        }
    }

    // meta_key (optional)
    if (data.meta_key && data.meta_key.length > 255) {
        errors.meta_key = "Meta key tối đa 255 ký tự";
    }

    // meta_desc (optional)
    if (data.meta_desc && data.meta_desc.length > 500) {
        errors.meta_desc = "Meta description tối đa 500 ký tự";
    }

    // trash
    if (data.trash !== undefined && ![0, 1].includes(Number(data.trash))) {
        errors.trash = "Trash chỉ nhận 0 hoặc 1";
    }

    // status
    if (data.status === undefined || ![0, 1].includes(Number(data.status))) {
        errors.status = "Trạng thái không hợp lệ";
    }

    return errors;
};

export const validateBrand = (data) => {
    const errors = {};

    // brand_name
    if (!data.brand_name || data.brand_name.trim() === "") {
        errors.brand_name = "Vui lòng nhập tên thương hiệu";
    } else if (data.brand_name.length > 100) {
        errors.brand_name = "Tên thương hiệu tối đa 100 ký tự";
    }

    // alias
    if (!data.alias || data.alias.trim() === "") {
        errors.alias = "Vui lòng nhập alias";
    } else if (!/^[a-z0-9-]+$/.test(data.alias)) {
        errors.alias = "Alias chỉ chứa chữ thường, số và dấu -";
    } else if (data.alias.length > 100) {
        errors.alias = "Alias tối đa 100 ký tự";
    }

    // trash
    if (data.trash !== undefined && ![0, 1].includes(Number(data.trash))) {
        errors.trash = "Trash chỉ nhận 0 hoặc 1";
    }

    // status
    if (data.status === undefined || ![0, 1].includes(Number(data.status))) {
        errors.status = "Trạng thái không hợp lệ";
    }

    return errors;
};

export const validatePage = (data) => {
    const errors = {};

    // title
    if (!data.title || data.title.trim() === "") {
        errors.title = "Vui lòng nhập tên trang";
    } else if (data.title.length > 100) {
        errors.title = "Tên trang tối đa 100 ký tự";
    }

    // alias
    if (!data.alias || data.alias.trim() === "") {
        errors.alias = "Vui lòng nhập alias";
    } else if (!/^[a-z0-9-]+$/.test(data.alias)) {
        errors.alias = "Alias chỉ chứa chữ thường, số và dấu -";
    } else if (data.alias.length > 100) {
        errors.alias = "Alias tối đa 100 ký tự";
    }

    // content
    if (!data.content || data.content.trim() === "") {
        errors.content = "Vui lòng nhập nội dung";
    }

    // status
    if (data.status === undefined || ![0, 1].includes(Number(data.status))) {
        errors.status = "Trạng thái không hợp lệ";
    }

    return errors;
};

export const validatePost = (data) => {
    const errors = {};

    // title
    if (!data.title || data.title.trim() === "") {
        errors.title = "Vui lòng nhập tiêu đề bài viết";
    } else if (data.title.length > 100) {
        errors.title = "Tiêu đề tối đa 100 ký tự";
    }

    // alias
    if (!data.alias || data.alias.trim() === "") {
        errors.alias = "Vui lòng nhập alias";
    } else if (!/^[a-z0-9-]+$/.test(data.alias)) {
        errors.alias = "Alias chỉ chứa chữ thường, số và dấu -";
    } else if (data.alias.length > 100) {
        errors.alias = "Alias tối đa 100 ký tự";
    }

    // content
    if (!data.content || data.content.trim() === "") {
        errors.content = "Vui lòng nhập nội dung";
    }

    // short_desc (optional)
    if (data.short_desc && data.short_desc.length > 255) {
        errors.short_desc = "Mô tả ngắn tối đa 255 ký tự";
    }

    // status
    if (data.status === undefined || ![0, 1].includes(Number(data.status))) {
        errors.status = "Trạng thái không hợp lệ";
    }

    return errors;
};