import * as React from 'react';
import {
  Svg, Path, G, Defs, ClipPath, Rect,
} from 'react-native-svg';
import CarIcon from '../assets/car_icon.svg';
import CloudOneIcon from '../assets/cloud_1_icon.svg';
import CloudTwoIcon from '../assets/cloud_2_icon.svg';
import TreeIcon from '../assets/tree_icon.svg';
import styles from '../../styles/footer';

export default function SVGCarIcon({style}) {
  return (
    <Svg style={style}  viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#clip0_673_118)">
        <Path d="M24.5833 27.8611H29.5V31.1389H24.5833V27.8611Z" fill="#C0C0C0FF" />
        <Path d="M43.3486 23.2231C40.442 18.4667 36.4767 14.4454 31.7617 11.4722C29.5834 10.0917 27.1004 9.26537 24.5292 9.0654C21.9581 8.86542 19.3772 9.29788 17.0117 10.325C14.9426 11.301 13.1421 12.7659 11.7659 14.5933C10.3896 16.4208 9.47882 18.5557 9.11222 20.8139C8.9811 21.5842 8.88277 22.3217 8.78444 23.0428C7.25002 23.2915 5.8539 24.0774 4.84525 25.2601C3.83661 26.4429 3.28106 27.9456 3.27777 29.5V39.5464C3.27777 40.4157 3.62311 41.2494 4.23781 41.8641C4.85251 42.4788 5.68623 42.8242 6.55555 42.8242V29.5C6.55555 28.6307 6.90088 27.797 7.51559 27.1823C8.13029 26.5676 8.96401 26.2222 9.83333 26.2222H40.5297C43.6884 26.2266 46.7164 27.4833 48.9499 29.7168C51.1834 31.9503 52.4401 34.9783 52.4444 38.137V39.3333H49.1667C48.4745 37.6455 47.1851 36.2715 45.5445 35.4737C43.904 34.6759 42.0271 34.51 40.272 35.0078C38.5169 35.5055 37.0066 36.632 36.0291 38.1723C35.0517 39.7127 34.6755 41.5589 34.9725 43.3589C35.2695 45.1588 36.2188 46.7864 37.6393 47.9311C39.0598 49.0757 40.852 49.6573 42.6739 49.5649C44.4959 49.4724 46.22 48.7124 47.5173 47.4298C48.8146 46.1472 49.5942 44.4319 49.7075 42.6111H52.4444C53.3138 42.6111 54.1475 42.2658 54.7622 41.6511C55.3769 41.0364 55.7222 40.2027 55.7222 39.3333V38.137C55.7156 34.6001 54.4765 31.1762 52.2182 28.4542C49.9599 25.7322 46.8235 23.8824 43.3486 23.2231ZM18.0278 22.9445H11.3575C11.3575 22.4364 11.505 21.912 11.6033 21.3056C11.8865 19.5052 12.6254 17.8071 13.7499 16.3729C14.8744 14.9386 16.347 13.8158 18.0278 13.1111V22.9445ZM21.3055 22.9445V12.4228C24.3653 12.0255 27.4683 12.697 30.09 14.3239C33.6689 16.5531 36.7578 19.4859 39.1694 22.9445H21.3055ZM42.2833 46.5117C41.473 46.5117 40.6808 46.2714 40.007 45.8212C39.3332 45.371 38.8081 44.7311 38.498 43.9824C38.1879 43.2337 38.1067 42.4099 38.2648 41.6151C38.4229 40.8203 38.8131 40.0903 39.3862 39.5173C39.9592 38.9443 40.6892 38.5541 41.484 38.396C42.2788 38.2379 43.1026 38.319 43.8513 38.6291C44.5999 38.9392 45.2398 39.4644 45.69 40.1382C46.1402 40.8119 46.3805 41.6041 46.3805 42.4145C46.3805 43.5011 45.9489 44.5432 45.1805 45.3116C44.4121 46.08 43.37 46.5117 42.2833 46.5117Z" fill="#E1E1E1" />
        <Path d="M23.2231 39.3334C22.5309 37.6455 21.2415 36.2716 19.6009 35.4737C17.9604 34.6759 16.0835 34.51 14.3284 35.0078C12.5733 35.5055 11.063 36.632 10.0855 38.1723C9.10806 39.7127 8.73194 41.5589 9.02893 43.3589C9.32593 45.1588 10.2752 46.7864 11.6957 47.9311C13.1162 49.0757 14.9084 49.6573 16.7303 49.5649C18.5523 49.4724 20.2764 48.7124 21.5737 47.4298C22.871 46.1472 23.6507 44.4319 23.7639 42.6111H32.45V42.2014C32.4176 41.2345 32.528 40.268 32.7778 39.3334H23.2231ZM16.3889 46.5117C15.5786 46.5117 14.7864 46.2714 14.1126 45.8212C13.4388 45.371 12.9137 44.7311 12.6036 43.9824C12.2935 43.2337 12.2123 42.4099 12.3704 41.6151C12.5285 40.8204 12.9187 40.0903 13.4917 39.5173C14.0647 38.9443 14.7948 38.5541 15.5896 38.396C16.3844 38.2379 17.2082 38.319 17.9568 38.6291C18.7055 38.9392 19.3454 39.4644 19.7956 40.1382C20.2458 40.812 20.4861 41.6041 20.4861 42.4145C20.4861 43.5011 20.0545 44.5433 19.2861 45.3116C18.5177 46.08 17.4756 46.5117 16.3889 46.5117Z" fill="#E1E1E1" />
      </G>
      <Defs>
        <ClipPath id="clip0_673_118">
          <Rect width="59" height="59" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export function SVGTreeIcon({style}) {
return(
    <Svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M13.0448 14C13.5501 8.3935 18.262 4 24 4C29.738 4 34.4499 8.3935 34.9552 14H35C39.9706 14 44 18.0294 44 23C44 27.9706 39.9706 32 35 32H13C8.02944 32 4 27.9706 4 23C4 18.0294 8.02944 14 13 14H13.0448Z" stroke="#E1E1E1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M24 28L29 23" stroke="#E1E1E1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M24 25L18 19" stroke="#E1E1E1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M24 44V18" stroke="#E1E1E1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>

)
}

export function SVGCloudOneIcon({style}) {
return(
    <Svg  style={style} width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M55 9.16675C59.3441 9.16662 63.6431 10.0487 67.6361 11.7595C71.6292 13.4704 75.2333 15.9743 78.2298 19.1195C81.2263 22.2648 83.5529 25.9858 85.0685 30.057C86.584 34.1282 87.257 38.4648 87.0466 42.8038C93.1733 44.9556 98.3409 49.206 101.634 54.8023C104.928 60.3987 106.135 66.9799 105.041 73.3807C103.948 79.7815 100.625 85.5889 95.6602 89.7746C90.6957 93.9603 84.4102 96.2542 77.9166 96.2501H32.0833C25.5898 96.2542 19.3043 93.9603 14.3398 89.7746C9.37531 85.5889 6.05213 79.7815 4.95871 73.3807C3.86528 66.9799 5.07216 60.3987 8.36562 54.8023C11.6591 49.206 16.8267 44.9556 22.9533 42.8038C22.7429 38.4648 23.4159 34.1282 24.9315 30.057C26.4471 25.9858 28.7736 22.2648 31.7702 19.1195C34.7667 15.9743 38.3707 13.4704 42.3638 11.7595C46.3569 10.0487 50.6558 9.16662 55 9.16675ZM55 18.3334C51.8968 18.3335 48.8259 18.9638 45.9736 20.1861C43.1213 21.4085 40.5469 23.1974 38.4066 25.4444C36.2663 27.6914 34.6047 30.3497 33.5225 33.258C32.4403 36.1664 31.96 39.2643 32.1108 42.3638L32.4316 49.1838L25.9966 51.448C21.9198 52.8898 18.4834 55.7256 16.2942 59.4547C14.1049 63.1839 13.3036 67.5666 14.0317 71.8292C14.7597 76.0917 16.9704 79.96 20.2733 82.7511C23.5762 85.5422 27.759 87.0766 32.0833 87.0834H77.9166C81.2915 87.0823 84.6006 86.1497 87.4794 84.3882C90.3581 82.6268 92.6948 80.1049 94.232 77.1004C95.7691 74.0959 96.4471 70.7253 96.1913 67.3602C95.9354 63.995 94.7556 60.7657 92.7819 58.0282C90.8081 55.2906 88.117 53.151 85.005 51.845C81.8931 50.539 78.481 50.1174 75.1447 50.6266C71.8085 51.1358 68.6775 52.556 66.0967 54.7308C63.516 56.9055 61.5856 59.7505 60.5183 62.9522L51.8191 60.0509C53.6471 54.5756 57.1509 49.8139 61.8345 46.4398C66.5181 43.0657 72.1442 41.2501 77.9166 41.2501C77.9166 35.1722 75.5022 29.3433 71.2045 25.0456C66.9068 20.7478 61.0779 18.3334 55 18.3334Z" fill="#E1E1E1"/>
    </Svg>

)
}
export function SVGCloudTwoIcon({style}) {
return(
    <Svg style={style} width="103" height="103" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M64.375 14.4844C57.6931 14.4876 51.1365 16.2977 45.3994 19.723C39.6622 23.1483 34.9581 28.0613 31.7852 33.9417C28.0936 33.5603 24.363 33.934 20.8204 35.04C17.2779 36.1459 13.9973 37.961 11.1784 40.3749C8.35946 42.7888 6.06111 45.7509 4.42315 49.0811C2.7852 52.4113 1.84189 56.0399 1.65062 59.7462C1.45935 63.4525 2.02412 67.1589 3.31056 70.64C4.597 74.1211 6.57822 77.3041 9.13368 79.9954C11.6891 82.6866 14.7654 84.8298 18.1753 86.2945C21.5853 87.7593 25.2575 88.515 28.9688 88.5156H64.375C74.1922 88.5156 83.6072 84.6158 90.549 77.674C97.4908 70.7322 101.391 61.3172 101.391 51.5C101.391 41.6828 97.4908 32.2678 90.549 25.326C83.6072 18.3842 74.1922 14.4844 64.375 14.4844ZM64.375 78.8594H28.9688C24.2736 78.9565 19.7322 77.1845 16.3435 73.9331C12.9549 70.6818 10.9966 66.2175 10.8995 61.5224C10.8024 56.8272 12.5744 52.2858 15.8257 48.8971C19.077 45.5085 23.5413 43.5502 28.2365 43.4531C27.6504 46.0952 27.3563 48.7937 27.3594 51.5C27.3594 52.7805 27.8681 54.0085 28.7735 54.914C29.679 55.8194 30.907 56.3281 32.1875 56.3281C33.468 56.3281 34.6961 55.8194 35.6015 54.914C36.507 54.0085 37.0156 52.7805 37.0156 51.5C37.0156 46.0888 38.6202 40.7992 41.6265 36.2999C44.6328 31.8007 48.9057 28.294 53.905 26.2232C58.9043 24.1525 64.4054 23.6107 69.7126 24.6663C75.0198 25.722 79.8947 28.3277 83.721 32.154C87.5473 35.9803 90.153 40.8553 91.2087 46.1624C92.2643 51.4696 91.7225 56.9707 89.6518 61.97C87.581 66.9693 84.0743 71.2422 79.5751 74.2485C75.0758 77.2548 69.7862 78.8594 64.375 78.8594Z" fill="#E1E1E1"/>
    </Svg>

)
}


