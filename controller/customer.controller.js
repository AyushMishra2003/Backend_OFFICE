import xlsx from 'xlsx';
import Customer from '../models/customer.model.js';
import { Parser } from 'json2csv';
import { createReadStream } from 'fs';

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
      name: row.Name,
      email: row.Email,
      mobile: row.Mobile
    }));

    console.log(userData);

    await Customer.insertMany(userData);

    res.status(200).json({
      success:true,
      message:"data added",
      data:userData
    })
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Error adding data', error: error.message });
  }
}

const getCustomer = async (req, res, next) => {
  try {
    const customers = await Customer.find({}).lean();

    if (customers.length === 0) {
      return res.status(404).json({ success: false, message: 'No customers found' });
    }

    // Prepare Excel workbook
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(customers);
    xlsx.utils.book_append_sheet(wb, ws, 'Customers');

    // Generate Excel file
    const excelFilePath = './customers.xlsx'; // Adjust the path as needed
    xlsx.writeFile(wb, excelFilePath);

    // Send the file as a response
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=customers.xlsx');
    
    createReadStream(excelFilePath).pipe(res);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Error downloading customers as Excel', error: error.message });
  }
}


export { addCustomersFromExcel, getCustomer };
