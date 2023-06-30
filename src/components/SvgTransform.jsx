import * as React from 'react';
import {
  Svg, Path, G, Defs, ClipPath, Rect,
} from 'react-native-svg';
import CarIcon from '../assets/car_icon.svg';
import CloudOneIcon from '../assets/cloud_1_icon.svg';
import CloudTwoIcon from '../assets/cloud_2_icon.svg';
import TreeIcon from '../assets/tree_icon.svg';
import styles from '../../styles/footer';

export default function SVGCarIcon() {
  return (
    <Svg style={styles.carIcon} width="50" height="50" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
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
/*
export function SVGTreeIcon() {
  return <SvgXml xml={TreeIcon} />;
}
export function SVGCloudOneIcon() {
  return <SvgXml xml={CloudOneIcon} />;
}
export function SVGCloudTwoIcon() {
  return <SvgXml xml={CloudTwoIcon} />;
}

 */
