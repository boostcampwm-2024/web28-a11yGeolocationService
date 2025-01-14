// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{html,js,jsx,ts,tsx}', // Tailwind가 처리할 파일 경로를 지정
  ],
  theme: {
    extend: {
      colors: {
        grayscale: {
          white: '#FFFFFF',
          25: '#FBFBFB',
          50: '#A0AEC0',
          75: '#E2E8F0',
          100: '#EDF2F7',
          150: '#AAB6C7',
          175: '#7A7A7A',
          200: '#6D6D6D',
          400: '#555555',
          800: '#3E3E3E',
          850: '#3C3C4399',
          900: '#1C1C1C',
        },
        blueGray: {
          200: '#495664',
          600: '#245C87',
          800: '#333C4A',
        },
        marker: {
          user1: '#B4D033',
          user2: '#22A751',
          user3: '#2722A7',
          user4: '#8F22A7',
          user5: '#A73D22',
        },
      },
      fontSize: {
        '3xs': '0.5rem',
        '2xs': '0.625rem',
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      boxShadow: {
        floatButton: '0 5px 10px rgba(0,0,0,0.3)',
        floatMenuButton: '0 4px 4px rgba(0,0,0,0.25)',
        float: '0 4px 20px rgba(0, 0, 0, 0.13)',
        userName: '5px 4px 7.1px rgba(0, 0, 0, 0.05)',
        basic: 'inset 0 0 3px rgba(0, 0, 0, 0.11)',
        dark: '0px -6px 20px 0px rgba(0, 0, 0, 0.25)',
        innerButton: 'inset 0 0 11.3px rgba(0, 0, 0, 0.07)',
      },
      keyframes: {
        smoothAppear: {
          '0%': { opacity: '0', transform: 'translateY(-5%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        smoothAppear: 'smoothAppear 0.5s ease-out', // 0.5s는 원하는 지속 시간
        smoothDisappear: 'smoothAppear 0.5s reverse ease-out', // 0.5s는 원하는 지속 시간
      },
      zIndex: {
        0: '0', // 메인 화면
        1000: '1000', // 캔바스
        1001: '1001', // 캔바스
        1002: '1002', // 캔바스
        1003: '1003', // 캔바스
        1004: '1004', // 캔바스
        4000: '4000', // 레이아웃
        6000: '6000', // 모달, 알림 등 오버레이 요소
        // 필요에 따라 추가적인 z-index 값을 더 추가할 수 있습니다.
      },
    }, // 필요한 커스터마이징을 여기서 설정 가능
  },
  plugins: [],
};
