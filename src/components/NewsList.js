import styled from 'styled-components';
import NewsItem from './NewsItem';
import { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';
axios.defaults.withCredentials = true;
const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

// const sampleArticle = {
//     title: '제목',
//     description: '내용',
//     url: 'https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=d7cc0816d2e749b9b3aafe26a38ed609',
//     urlToImage: 'https://nbcsports.brightspotcdn.com/dims4/default/a17d72f/2147483647/strip/true/crop/8256x4644+0+0/resize/1440x810!/quality/90/?url=https%3A%2F%2Fnbc-sports-production-nbc-sports.s3.us-east-1.amazonaws.com%2Fbrightspot%2F3b%2Fb2%2Fc523170045c4a1a2a391b393b984%2Fhttps-delivery-gettyimages.com%2Fdownloads%2F2181792051',
// };

const NewsList = ({ category }) => {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const query = category === 'all' ? '' : `&category=${category}`;
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=us${query}&apiKey=d7cc0816d2e749b9b3aafe26a38ed609`
                );
                setArticles(response.data.articles)
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [category]);

    // 대기 중일 때
    if (loading) {
        return <NewsListBlock>대기 중...</NewsListBlock>;
    }
    // 아직 articles 값이 설정되지 않았을 때
    if (!articles) {
        return null;
    }

    return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />                
            ))}            
        </NewsListBlock>
    );
};

export default NewsList;