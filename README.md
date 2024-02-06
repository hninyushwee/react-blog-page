<!-- ######### Firstly, if you want run this page,open terminal and run following ###########-->

### npm run dev

<!-- to run vite + react app -->

### npm run json-server

<!-- to run json server -->

<!-- In My Blog page,it have home tab, create post tab and login tab.
If user want to create new post, fistly login and create new account in register page if user hasn't account.This page is responsive -->

### You can see Register and Login source code in auth folder

# Register

<!-- In Register Page, email or phone have already created account, show error message -->
<!-- Password encrypt with bcrypt library -->

# Login

<!-- In Login Page, you can login email or phone. Input password test with bcrypt.compare function from bcrypt libray -->
<!--After User login success, store user id to localstorage -->

### AuthContext and ThemeContext from contexts folder

# AuthContext

<!-- Get user id from localstorage -->

# ThemeContext

<!--To change theme Light and Dark mode  -->

# ApiDataContext

<!-- Get All users data , user details and category -->

### posts and userpofile from view folder

## HomePage from posts folder

# PostLists from HomePage folder

<!-- User can search title and filter by category.
This file has to show all post, latest post data and pagination
 -->

# LatestPosts from HomePage folder

<!--To get latest 6 posts, used filter latest date from all posts and use slice method to get 6 posts -->

# AllPosts from Home folder

<!--show paginate 10 posts from all posts -->

## PostDetails from posts folder

<!-- Auth User can Delete and Update his post and is not allow other user post.
Any login user can give like and comment
-->

## Comment from posts folder

<!-- all user can see comment but create comment only login user   -->
<!-- user can edit and delete his comment -->

## userprofile from posts folder

# ProfilePage from userprofile

<!--At Profile page, can see auth user's data  -->
<!-- This page can change user profile data such as email, name ,etc.... -->

# UserPostList from userprofile

<!--Can see posts of Auth user's  -->

### Loading.jsx

<!-- When get posts data and get google font, show loading page  -->

### PageNotFound.jsx

<!-- if user go unavaliable url, show page not found page. -->
