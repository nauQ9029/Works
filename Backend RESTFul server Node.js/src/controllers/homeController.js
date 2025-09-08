const getHomePage = (req, res) => {
    //process data
    // call model
    res.render("sample.ejs");
};

const getAboutPage = (req, res) => {
  res.send("This is about page");
};

const getContactPage = (req, res) => {
  res.send("This is contact page");
};

const getDetailPage = (req, res) => {
  res.send("This is detail page");
};

module.exports = {
  getHomePage,
  getAboutPage,
  getContactPage,
  getDetailPage,
};
