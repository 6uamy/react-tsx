import React, { useState } from 'react';
import './App.css';

interface Post {
    id: number;
    title: string;
    content: string;
    date: string;
}

const App: React.FC = () => {
    const title: string = 'my Blog';
    const posts = [
        {
            id: 1,
            title: '미움받을용기',
            content: '모든 고민은 인간관계에서 비롯된다.',
            date: '2020-12-28',
        },
        {
            id: 2,
            title: '더마인드',
            content: '두번째 게시물 입니다.',
            date: '2022-01-20',
        },
        {
            id: 3,
            title: '도둑맞은집중력',
            content: '세번째 게시물 입니다.',
            date: '2013-07-03',
        },
    ];
    let [post, setPost] = useState<Post[]>(posts);
    let [likes, setLikes] = useState<number[]>([0, 0, 0]);
    const [detail, setDetail] = useState<boolean>(false);
    let [index, setIndex] = useState<number>(0);
    let [input, setInput] = useState<string>('');

    const changeBookTitle = (): void => {
        let newArr = [...posts];
        newArr[0].title = '도움받을용기';
        setPost(newArr);
    };
    const addLikes = (postsIdx: number): void => {
        let cplikes = [...likes];
        cplikes[postsIdx] += 1;
        setLikes(cplikes);
    };

    const detailClick = (idx: number): void => {
        setIndex(idx);
        detail === true ? setDetail(false) : setDetail(true);
    };

    const addPost = (): void => {
        const newPost: Post = {
            id: post.length + 1,
            title: input,
            content: '새로운 게시글',
            date: '2023-02-05'
        };

        setLikes((prevLikes) => [...prevLikes, 0]);
        setPost((prevPosts) => [...prevPosts, newPost]);
    };

    const deleteBook = (idx: number): void => {
        let cpPosts = [...post];
        cpPosts.splice(idx, 1);
        setPost(cpPosts);
    }

    return (
        <div className='App'>
            <div className='title-nav'>
                <h1>{title}</h1>
            </div>

            <div className='container'>
                <div className='board'>
                    <input className='input' type='text' onChange={
                        (e) => {
                            setInput(e.target.value);
                        }
                    }></input>
                    <button onClick={addPost}>추가</button>
                </div>
            </div>

            <div className='container'>
                <div className='board'>
                    {post.map(function (post: Post, idx) {
                        return (
                            <div className='post' key={idx}>
                                <h3 onClick={() => detailClick(idx)}>{post.title}
                                <span onClick={(e) => {
                                    e.stopPropagation();
                                    addLikes(idx)
                                    }}> 👍 </span> {likes[idx]}
                                </h3>
                                <p>{post.date}</p>
                                <button onClick={changeBookTitle}> 변경하기 </button>
                                <button className='delButton' onClick={() => deleteBook(idx)}> 삭제하기 </button>
                            </div>
                        );
                    })}
                </div>
            </div>
            {detail === true ? <Detail post={post} index={index}/> : null}
        </div>
    );
};

interface DetailProps {
    post: Post[];
    index: number;
}

const Detail: React.FC <DetailProps> = ({post, index}) => {
    return (
        <div className='detail'>
            <h3>{post[index].title}</h3>
            <h4>{post[index].content}</h4>
            <p>{post[index].date}</p>
        </div>
    );
};

const Timer: React.FC = () => {
    let [timer, setTimer] = useState<number>(0);
    return (
        <div className='detail'>
            <h3>타이머: {timer} 초</h3>
            <button
                onClick={function () {
                    setInterval(() => {
                        setTimer((timer) => timer + 1);
                    }, 1000);
                }}
            >
                시작
            </button>
        </div>
    );
};

export default App;
