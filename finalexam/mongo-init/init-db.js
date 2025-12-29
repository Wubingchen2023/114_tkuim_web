// MongoDB Initialization Script for Docker
// This runs automatically when the container first starts

print('Starting HBO MAX Platform Database Initialization...');

// Switch to database
db = db.getSiblingDB('hbomax_platform');

db.createCollection('users');
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 }, { unique: true });

db.createCollection('videos');
db.videos.createIndex({ category: 1, createdAt: -1 });
db.videos.createIndex({ rating: -1 });
db.videos.createIndex({ viewCount: -1 });

db.createCollection('comments');
db.comments.createIndex({ videoId: 1, createdAt: -1 });

db.createCollection('ratings');
db.ratings.createIndex({ videoId: 1, userId: 1 }, { unique: true });

db.createCollection('playlists');
db.playlists.createIndex({ userId: 1, createdAt: -1 });

db.createCollection('favorites');
db.favorites.createIndex({ userId: 1, videoId: 1 }, { unique: true });
db.favorites.createIndex({ userId: 1, createdAt: -1 });

db.users.insertOne({
    username: 'admin',
    email: 'admin@hbomax.com',
    password: '$2a$10$XVHJ8Y7KqH.iFxVqYqH.iFxVqYqH.iFxVqYqH.iFxVqYqH.iFxVqY',
    role: 'admin',
    avatar: 'https://via.placeholder.com/150',
    createdAt: new Date(),
    updatedAt: new Date()
});

var adminId = db.users.findOne({ username: 'admin' })._id;

db.videos.insertMany([
    {
        title: '不可能的任務：最終清算',
        description: '「每一個選擇，每一項任務，導致了這一切。」伊森不只要面對過去的種種，還將迎來前所未有的考驗，這是一場關乎信念與命運的抉擇。',
        thumbnail: 'https://www.simon-how.com/wp-content/uploads/2025/06/Poster-Mission-Impossible-final-reckoning-Grievity-V2-e1749136880335.jpg',
        videoUrl: 'https://www.youtube.com/embed/f1RNAslZPlY',
        duration: 163,
        category: 'action',
        releaseYear: 2025,
        director: 'Christopher McQuarrie',
        cast: ['Tom Cruise', 'Hayley Atwell', 'Ving Rhames'],
        rating: 7.2,
        viewCount: 0,
        uploadedBy: adminId,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: '米奇17號',
        description: '米奇巴恩斯接下了有史以來最為犧牲奉獻的工作，還必須為了討生活不斷死去。',
        thumbnail: 'https://ntvb.tmsimg.com/assets/p25672724_v_h8_aj.jpg?w=1280&h=720',
        videoUrl: 'https://www.youtube.com/embed/muo0ulMNENQ',
        duration: 137,
        category: 'sci-fi',
        releaseYear: 2025,
        director: '奉俊昊',
        cast: ['Robert Pattinson', 'Mark Ruffalo'],
        rating: 6.7,
        viewCount: 0,
        uploadedBy: adminId,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: '一戰再戰',
        description: '昔日的激進分子巴柏，如今成了偏執的癮君子。當宿敵歸來、女兒消失無蹤，他不得不四處奔走，試圖找回女兒。',
        thumbnail: 'https://image.tmdb.org/t/p/original/25CvazWe90SlAC0p287J1HIn73p.jpg',
        videoUrl: 'https://www.youtube.com/embed/vSxDmiucO0Y',
        duration: 162,
        category: 'drama',
        releaseYear: 2025,
        director: '保羅湯瑪斯安德森',
        cast: ['Leonardo DiCaprio', 'Sean Penn'],
        rating: 7.9,
        viewCount: 0,
        uploadedBy: adminId,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: '凶器',
        description: '當同一班級的學生於同一晚、同一時間神秘失蹤，僅剩一人倖存，整個社區開始追尋背後隱藏的真相。',
        thumbnail: 'https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/bcbb6e0d-ca89-43e4-a9b1-2fc728145beb/fe5c2ef3-1c8a-4c9e-b722-b036f018856c?host=wbd-images.prod-vod.h264.io&partner=beamcom',
        videoUrl: 'https://www.youtube.com/embed/m1jOUZvYOsY',
        duration: 128,
        category: 'horror',
        releaseYear: 2025,
        director: '札克·克瑞格',
        cast: ['Julia Garner', 'Josh Brolin'],
        rating: 7.5,
        viewCount: 0,
        uploadedBy: adminId,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: '變形金剛：源起',
        description: '柯博文與密卡登不為人知的起源故事。昔日戰友變成不共戴天的敵人。',
        thumbnail: 'https://miro.medium.com/v2/resize:fit:1400/1*Y3WxTjeuk4mUkt2jvd43rw.png',
        videoUrl: 'https://www.youtube.com/embed/3pTqK3Rwomw',
        duration: 104,
        category: 'animation',
        releaseYear: 2024,
        director: 'Josh Cooley',
        cast: ['Chris Hemsworth', 'Scarlett Johansson'],
        rating: 7.6,
        viewCount: 0,
        uploadedBy: adminId,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: '超人',
        description: '三位好友在拉斯維加斯的單身派對後醒來，卻發現他們的朋友失蹤，並且對前一晚發生的事毫無記憶。',
        thumbnail: 'https://m.media-amazon.com/images/S/pv-target-images/f88dcfc4e91ee92c30207ff65378038aa7a91a6f550402d55954412e882b6b10.jpg',
        videoUrl: 'https://www.youtube.com/embed/oyYAueF8j-8',
        duration: 129,
        category: 'superhero',
        releaseYear: 2025,
        director: 'James Gunn',
        cast: ['David Corenswet', 'Rachel Brosnahan', 'Nicholas Hoult'],
        rating: 7.1,
        viewCount: 0,
        uploadedBy: adminId,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: '無痛先生',
        description: '內森凱恩患有罕見的先天性疾病，無法感受到任何疼痛。眼看他夢想中的女友在銀行劫案中遭劫持，他將自己沒有痛覺的缺陷轉化為意想不到的力量，為救回她而奮鬥。',
        thumbnail: 'https://waghostwriter.com/wp-content/uploads/2025/03/p28989445_v_h10_aa-1200x675.jpg',
        videoUrl: 'https://www.youtube.com/embed/1Fer5H6sVqo',
        duration: 110,
        category: 'comedy',
        releaseYear: 2025,
        director: 'Dan Berk',
        cast: ['Jack Quaid', 'Amber Midthunder'],
        rating: 6.5,
        viewCount: 0,
        uploadedBy: adminId,
        createdAt: new Date(),
        updatedAt: new Date()
    },
]);

print('Database initialization complete!');
print('Sample data inserted: 1 admin user and 6 videos');
