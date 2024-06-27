import xlsx from 'xlsx';
import Customer from '../models/customer.model.js';
import { Parser } from 'json2csv';
import { createReadStream } from 'fs';
import { log } from 'console';

const addCustomersFromExcel = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const excelData = xlsx.utils.sheet_to_json(sheet);

    const userData = excelData.map(row => ({
      member: row.member,
      mobile: row.mobile,
      gender: row.gender,
      email: row.email,
      password: row.password
    }));

    console.log(userData);

    // Insert customers into MongoDB
    const result = await Customer.insertMany(userData, { ordered: false });

    // Check for duplicate key errors in the result
    const duplicateErrors = result.filter(entry => entry instanceof Error && entry.code === 11000);

    if (duplicateErrors.length > 0) {
      // Extract duplicated fields
      const duplicates = duplicateErrors.map(error => ({
        key: Object.keys(error.keyValue)[0],
        value: error.keyValue[Object.keys(error.keyValue)[0]]
      }));

      return res.status(400).json({
        success: false,
        message: 'Duplicate key error',
        duplicates: duplicates
      });
    }

    res.status(200).json({
      success: true,
      message: 'Data added successfully',
      data: result
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Error adding data', error: error.message });
  }
};



const getCustomers = async (req, res, next) => {
  const page = req.query.page || 1; 
  const limit = 100; 

  try {
    // Fetch customers for the current page
    const customers = await Customer.find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    if (customers.length === 0) {
      return res.status(404).json({ success: false, message: 'No customers found' });
    }

    // Prepare Excel workbook for the current page
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(customers);
    xlsx.utils.book_append_sheet(wb, ws, `Customers Page ${page}`);

    // Generate Excel file in a buffer
    const excelBuffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

    // Send the file as a response
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=customers_page_${page}.xlsx`);

    // Pipe workbook buffer directly to response stream
    res.write(excelBuffer);
    res.end();

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Error downloading customers as Excel', error: error.message });
  }
};


export { addCustomersFromExcel, getCustomers };
