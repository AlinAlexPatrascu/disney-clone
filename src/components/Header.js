import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, Link as UnstyledLink } from 'react-router-dom'
import 
{
  selectUserName,
  selectUserPhoto,
  setSignOut,
  setUserLogin
} from '../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { auth, provider } from '../firebase'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userName = useSelector(selectUserName)
  const userPhoto = useSelector(selectUserPhoto)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUserLogin({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        }))
        navigate('/');
      } else {
        navigate('/login')
      }
    });
  }, [])

  const signIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      let user = result.user;
      console.log(result);
      dispatch(setUserLogin({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      }))
      navigate('/');
    });
  }

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      navigate('/login');
    })
  }

  return (

    
    <Nav>
      <Link to='/'>
        <Logo src="/images/logo.svg" />
      </Link>
      { !userName ?
      (
        
      <LoginContainer>
        <Login onClick={ signIn }>Login</Login>
      </LoginContainer>
      ) : (
        <>
          <NavMenu>
            <Link to="/">
              <img src="/images/home-icon.svg" />
              <span>HOME</span>
            </Link>
            <a>
              <img src="/images/search-icon.svg" />
              <span>SEARCH</span>
            </a>
            <a>
              <img src="/images/watchlist-icon.svg" />
              <span>WATCHLIST</span>
            </a>
            <a>
              <img src="/images/original-icon.svg" />
              <span>ORIGINALS</span>
            </a>
            <a>
              <img src="/images/movie-icon.svg" />
              <span>MOVIE</span>
            </a>
            <a>
              <img src="/images/series-icon.svg" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <UserImg onClick = { signOut }
           src={ userPhoto } />
        </>
      )
    }
    </Nav>
  )
}

export default Header

const Nav = styled.nav`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
`

const Logo = styled.img`
  width: 80px;
`

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
      height: 20px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        right: 0;
        left: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0);
      }
    }

      &:hover {
        span:after {
          transform: scaleX(1);
          opacity: 1;
        }
      }
    }
`
const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
`
const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 250ms ease 0ms;
  
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`
const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const Link = styled(UnstyledLink)`
    text-decoration: none;
    color: #f9f9f9;
    display: flex;
    align-items: center;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;