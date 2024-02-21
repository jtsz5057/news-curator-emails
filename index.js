require ('dotenv').config();
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
