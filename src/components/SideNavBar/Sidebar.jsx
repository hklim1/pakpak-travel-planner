import React, { useState } from "react";
import "./Sidebar.css";
import { Home,
LayoutGrid,
BookOpenText,
PenSquare,
CalendarClock,
Archive,
Settings
} from 'lucide-react';

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const menuItems = [
        {
            text: "HOME",
            icon: <LayoutGrid size={30}/>,
            link: "/home"
        },
        {
            text: "EXPLORE",
            icon: <BookOpenText size={30}/>,
            link: "/explore"
        },
        {
            text: "PLAN",
            icon: <PenSquare size={30}/>,
            link: "/plan"
        },
        {
            text: "UPCOMING",
            icon: <CalendarClock size={30}/>,
            link: "/upcoming"
        },
        {
            text: "PAST",
            icon: <Archive size={30}/>,
            link: "/past"
        },
        {
            text: "SETTINGS",
            icon: <Settings size={30}/>,
            link: "/settings"
        }
    ]

  return (
    <div className={isExpanded ? "side-nav-container" : "side-nav-container side-nav-container-NX sidebar-title"}>
        <div className="nav-upper">
            <div className="nav-heading">
                {isExpanded && //the isExpanded here makes the whole home icon + company name disappear upon sidebar collapse
                    (<div className="nav-brand">
                        {/* <img src="icons/Logo.svg" alt="IMG BY PAKPAK TITLE" /> */}
                        {/* <img src="~lucide-static/icons/home.svg" className="logo-img"/> */}
                        <div className="logo-img">
                            {/* <Home size={30} /> */}
                            <img src="../src/assets/PakPakLogo.png" width="160px" height="60px"></img>
                        </div>
                        {/* <h2 className="sidebar-title">Pakpak</h2> */}
                    </div>
                )}
                <button className={
                    isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
                    }
                    onClick={() => setIsExpanded(!isExpanded)} //!isExpanded ONLY means that I am setting it to the opposite of what it was before. If it was expanded, it will now collapse & vice versa.
                    >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div className="nav-menu">{menuItems.map(({text, icon, link}) => (
                <a href={localStorage['token'] || text=="HOME" ? link : '/login'} className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}>
                    <div className="menu-item-img">
                        {icon}
                    </div>
                    {isExpanded && <p>{text}</p>}
                    {!isExpanded && <div className="tooltip">{text}</div>}
                </a>
            ))}
            </div>
        </div>
    </div>
  )
}

// 	const [isExpanded, setExpendState] = useState(false);
// 	const menuItems = [
// 		{
// 			text: "Dashboard",
// 			icon: <Home size={20}/>,
// 		},
// 		{
// 			text: "Admin Profile",
// 			icon: <Home size={20}/>,
// 		},
// 		{
// 			text: "Messages",
// 			icon: <Home size={20}/>,
// 		},
// 		{
// 			text: "Analytics",
// 			icon: <Home size={20}/>,
// 		},
// 		{
// 			text: "File Manager",
// 			icon: <Home size={20}/>,
// 		},
// 		{
// 			text: "Orders",
// 			icon: <Home size={20}/>,
// 		},
// 		{
// 			text: "Saved Items",
// 			icon: <Home size={20}/>,
// 		},
// 		{
// 			text: "Pancakes",
// 			icon: <Home size={20}/>,
// 		},
// 	];
// 	return (
// 		<div
// 			className={
// 				isExpanded
// 					? "side-nav-container"
// 					: "side-nav-container side-nav-container-NX"
// 			}
// 		>
// 			<div className="nav-upper">
// 				<div className="nav-heading">
// 					{isExpanded && (
// 						<div className="nav-brand">
// 							{/* <Home /> */}
// 							<h2>Showkart</h2>
// 						</div>
// 					)}
// 					<button
// 						className={
// 							isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
// 						}
// 						onClick={() => setExpendState(!isExpanded)}
// 					>
// 						<span></span>
// 						<span></span>
// 						<span></span>
// 					</button>
// 				</div>
// 				<div className="nav-menu">
// 					{menuItems.map(({ text, icon }) => (
// 						<a
// 							className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
// 							href="#"
// 						>
// 							<img className="menu-item-icon" src={icon} alt="" srcset="" />
// 							{isExpanded && <p>{text}</p>}
// 						</a>
// 					))}
// 				</div>
// 			</div>
// 			<div className="nav-footer">
// 				{isExpanded && (
// 					<div className="nav-details">
// 						<img
// 							className="nav-footer-avatar"
// 							src="icons/admin-avatar.svg"
// 							alt=""
// 							srcset=""
// 						/>
// 						<div className="nav-footer-info">
// 							<p className="nav-footer-user-name">M Showkat</p>
// 							<p className="nav-footer-user-position">store admin</p>
// 						</div>
// 					</div>
// 				)}
// 				<img className="logout-icon" src="icons/logout.svg" alt="" srcset="" />
// 			</div>
// 		</div>
// 	);
// };

// export default Sidebar;