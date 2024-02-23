const dotenv = require('dotenv');
dotenv.config();

const mgMail = require('');
mgMail.setApiKey(process.env.MAILGUN_API_KEY)

const schedule = require('node-schedule');
const NewsAPI = require('newsapi');

const newsapi = new NewsAPI(process.env.NEWS_API_KEY)

const getDailyNews = async () => {
    // Calculate Today's date and Yesterday's date
    const today = new Date();
    const yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));
    const yesterdayDate = yesterday.toISOString().split('T')[0];
    const todayDate = today.toISOString().split('T')[0];
   
    // Get Top Headlines from News API
    const response = await newsapi.v2.topHeadlines({
      language: 'en', // language to display the news in 
      country: 'us', // country to display the news from
      pageSize: 100, 
      page: 1,
      from: yesterdayDate,
      to: todayDate,
    });
  
    return response; // response will be returned in a JSON format
  };

// generate HTML for email template
  const generateTemplate = (news) => {
    const newsArticles = news.articles; // An array of articles
    let htmlTemplate = '<h1>Daily News</h1>'; // Will be initialized with the heading
    newsArticles.forEach((article, index) => { // Loop to iterate through the array of articles
      htmlTemplate += `<h2>${index + 1}</h2>`; // A the index of the article
      htmlTemplate += `<h3>${article.title}</h3>`; // A the title of the article
      htmlTemplate += `<p>${article.description}</p>`; // Then with the description of the article
      htmlTemplate += `<a href="${article.url}">Read More</a>`; // At last, it will be appended with the url of the source.
    }); 
    return htmlTemplate; // Formatted HTML will be returned
  };


  const sendEmail = async (htmlTemplate) => {
    const msg = {
      to: 'jtsz0112@outlook.com', // Email address of the recipient
      from: {
        name: 'Jonathan Tan', // Name of the sender
        email:'jtsz5057@gmail.com' // Email address of the sender
      },
      subject: 'Daily News', // Subject of the email
      html: htmlTemplate, // htmlTemplate will be passed as the html of the email
    };
    await mgMail.send(msg); // Mailgun API will be used to send the email
  }