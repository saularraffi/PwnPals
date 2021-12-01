const express = require("express")
const bugReportController = require("../controllers/bugReportController")
const router = express.Router()

const endpoint = "/bug-report"

router.get(endpoint, bugReportController.getReport)
router.get(`${endpoint}/all`, bugReportController.getAllReports)
router.post(endpoint, bugReportController.postReport)
router.put(endpoint, bugReportController.updateReport)
router.delete(endpoint, bugReportController.deleteReport)

module.exports = router