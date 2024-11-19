const Employee = require('../models/employee.model');

// Lấy danh sách người dùng và render ra view index.ejs
const list = async (req, res) => {
    try {
        const employees = await Employee.find();  // Lấy tất cả người dùng từ MongoDB
        res.render('index', { employees });  // Render ra view index.ejs và truyền danh sách users
    } catch (err) {
        res.status(500).send({ message: 'Có lỗi xảy ra khi lấy danh sách người dùng.' });
    }
};

// Hiển thị form thêm người dùng mới (add.ejs)
const showAddForm = (req, res) => {
    res.render('add');  // Render ra view add.ejs
};
// Thêm người dùng mới vào CSDL
const add = async (req, res) => {
    const { name, email, position, salary } = req.body;
    const newEmployee = new Employee({ name, email, position, salary });

    try {
        await newEmployee.save(); // Lưu người dùng mới vào MongoDB
        res.redirect('/'); // Sau khi thêm xong, quay về trang danh sách
    } catch (err) {
        res.status(400).send({ message: 'Có lỗi xảy ra khi thêm người dùng.' });
    }
};

// Hiển thị form chỉnh sửa người dùng (edit.ejs)
const showEditForm = async (req, res) => {
    const employeeId = req.params.id; // Lấy ID của người dùng từ URL

    try {
        const employee = await Employee.findById(employeeId); // Tìm người dùng theo ID
        if (!employee) return res.status(404).send({ message: 'Người dùng không tồn tại.' });
        res.render('edit', { employee }); // Render ra view edit.ejs với thông tin người dùng
    } catch (err) {
        res.status(500).send({ message: 'Có lỗi xảy ra khi hiển thị form chỉnh sửa.' });
    }
};

// Cập nhật thông tin người dùng
const edit = async (req, res) => {
    const employeeId = req.params.id; // Lấy ID của người dùng từ URL
    const { name, email, position, salary } = req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, req.body);
        if (!updatedEmployee) return res.status(404).send({ message: 'Người dùng không tồn tại.' });
        res.redirect('/'); // Sau khi cập nhật xong, quay về trang danh sách
    } catch (err) {
        res.status(400).send({ message: 'Có lỗi xảy ra khi cập nhật người dùng.' });
    }
};

// Xóa người dùng
const del = async (req, res) => {
    const employeeId = req.params.id; // Lấy ID của người dùng từ URL

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId); // Xóa người dùng
        if (!deletedEmployee) return res.status(404).send({ message: 'Người dùng không tồn tại.' });
        res.redirect('/'); // Sau khi xóa xong, quay về trang danh sách
    } catch (err) {
        res.status(500).send({ message: 'Có lỗi xảy ra khi xóa người dùng.' });
    }
};

module.exports = { list, showAddForm, add, showEditForm, edit, del }
