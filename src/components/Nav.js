import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';


function fadeInNav(el) {
    el.style.opacity = 0;
    el.style.display = "flex";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            setTimeout(fade, 40);
        }
    })();
};

function fadeIn(el) {
    el.style.opacity = 0;
    el.style.display = "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            setTimeout(fade, 40);
        }
    })();
};

function fadeOut(el) {
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            setTimeout(fade, 10);
        }
    })();
};


const Nav = ({ navVisible, portfolioRef, contactRef }) => {

    const mainBtnRef = useRef();
    const toggleRef = useRef();
    const toggleBtnRef = useRef();
    const portfolioBtnRef = useRef();
    const contactBtnRef = useRef();

    const visibleRef = useCallback(node => {
        if (node !== null) {
            fadeInNav(node);
        }
    }, []);

    const scrollIt = (element) => {
        window.scrollTo({
            'behavior': 'smooth',
            'left': 0,
            'top': element.offsetTop - 80
        });
    }

    const scrollTop = () => {
        window.scrollTo({
            'behavior': 'smooth',
            'left': 0,
            'top': 0
        });
    }

    const onClickToggleBtnRef = () => {

        const displayStatus = toggleRef.current.style.display;
        if (displayStatus === 'block') {
            fadeOut(toggleRef.current);
        } else {
            fadeIn(toggleRef.current);
        }

        toggleBtnRef.current.blur();

    }

    const onClickMainBtn = () => {
        scrollTop();
        mainBtnRef.current.blur();
    }
    const OnClickPortfolioBtn = () => {
        console.log(portfolioRef.current);
        scrollIt(portfolioRef.current);
        portfolioBtnRef.current.blur();
    }
    const OnClickContactBtn = () => {
        scrollIt(contactRef.current);
        contactBtnRef.current.blur();
    }

    return (
        <>
            {navVisible ?
                <div className="flex">
                    <Navigation ref={visibleRef}>
                        <div className="flex  text-white mr-6 w-auto" >
                            <button ref={mainBtnRef} onClick={onClickMainBtn} className="flex flex-row items-center">
                                <svg className="fill-current h-5 w-5  mr-2 text-sm tracking-wide md:h-8  md:w-8 " width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
                                <span className="font text-sm tracking-wide md:text-2xl">WORLD BEST PARTNERS</span>
                            </button>
                        </div>

                        <div onClick={onClickToggleBtnRef} className="flex w-auto lg:hidden">
                            <button ref={toggleBtnRef} className="flex px-3 py-2 border rounded text-gray-200 border-gray-200 hover:text-white hover:border-white ">
                                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                            </button>
                        </div>

                        <div ref={toggleRef} className="w-full block flex-grow lg:flex lg:items-center lg:w-auto hidden opacity-0 lg:opacity-100">
                            <div className="flex-1 text-lg  justify-end items-end lg:flex ">
                                <ButtonDiv>
                                    <Button onClick={OnClickPortfolioBtn} ref={portfolioBtnRef} >Portfolio</Button>
                                </ButtonDiv>
                                <ButtonDiv>
                                    <Button onClick={OnClickContactBtn} ref={contactBtnRef}>Contact</Button>
                                </ButtonDiv>
                            </div>
                            {/* <div className="flex  items-center justify-end">
                                <button ref={btnRef} className="text-left text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</button>
                            </div> */}
                        </div>
                    </Navigation>
                </div>
                :
                null}
        </>

    )
}

const Navigation = styled.nav`
    display:flex;
    position:fixed;
    width:100%;
    flex-wrap:wrap;
    align-items:center;
    background-color: #2a4365;
    padding: 1.5rem;
    justify-content: space-between;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); 
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    z-index:100;
`;

const ButtonDiv = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-end;
    @media (min-width: 1024px) {
        justify-content:center;
    };
`;

const Button = styled.button`
    display: flex;
    margin-top: 1rem;
    color: #edf2f7;
    margin-right: 1rem;
    :hover{
        color: #fff;
    };
    @media (min-width: 1024px) {
    display: inline-block;
    margin-top:0;
    };

`;



export default Nav;