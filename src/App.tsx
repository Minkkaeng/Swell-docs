import { useState, useEffect } from "react";

type TermType = "service" | "privacy" | "location";

const termsData: Record<TermType, { title: string; lastUpdated: string; content: string[] }> = {
  service: {
    title: "서비스 이용약관",
    lastUpdated: "2026-02-20",
    content: [
      '제1조 (목적)\n본 약관은 너울 팀(이하 "회사")이 제공하는 ‘너울(Swell)’ 서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.',
      "제2조 (정의)\n1. “서비스”라 함은 회원이 이용할 수 있는 ‘너울(Swell)’ 앱 및 이와 관련된 제반 서비스를 의미합니다.\n2. “회원”이라 함은 본 약관에 동의하고 이용계약을 체결하여 서비스를 이용하는 고객을 말합니다.\n3. “직종 인증”이라 함은 회사가 정한 절차에 따라 회원의 직업적 신원을 확인하고 인증 배지 등을 부여하는 행위를 말합니다.\n4. “콘텐츠”라 함은 회사 또는 회원이 서비스상에 게시한 글, 사진, 동영상, 유료 아이템 등을 의미합니다.\n5. “인앱결제”라 함은 각 스토어 내에서 유료 콘텐츠나 구독 상품을 구매하기 위해 사용하는 결제 수단을 의미합니다.",
      "제7조 (회원가입 및 직종 인증)\n1. 회원가입은 이용자가 본 약관 및 개인정보 처리방침에 동의한 후 신청하고, 회사가 승낙함으로써 체결됩니다.\n2. [너울 특화 조항] 본 서비스는 성인 및 직장인을 대상으로 합니다. 회사는 서비스의 신뢰성을 위해 직장 이메일, 명함 이미지 등을 통한 직종 인증을 요구할 수 있습니다.\n3. 타인의 명의나 정보를 도용하여 가입하거나 인증을 시도한 경우, 회사는 즉시 계정을 정지하고 관련 법적 책임을 물을 수 있습니다.",
      "제24조 (게시물의 저작권 및 영리적 활용)\n1. 회원이 서비스 내에 게시한 글의 저작권은 해당 회원에게 귀속됩니다.\n2. (영리적 이용 권한 부여) 회원은 본 서비스를 이용함으로써, 회사가 회원의 게시물을 영리적 목적으로 이용하는 것에 대하여 전 세계적, 영구적, 무상의 독점적 이용권을 회사에 부여합니다.\n3. (수익 귀속) 게시물의 활용으로 인해 발생하는 모든 경제적 이익은 전적으로 ‘회사’에 귀속되며, 회원은 별도의 수익 배분 등을 청구할 수 없습니다.",
    ],
  },
  privacy: {
    title: "개인정보 처리방침",
    lastUpdated: "2026-02-20",
    content: [
      "제1조 (개인정보의 수집 및 이용)\n회사는 서비스 제공을 위해 최소한의 개인정보를 수집합니다.\n- 필수항목: 닉네임, 계정 이메일, 성별, 연령대\n- 직종 인증 시: 직장 이메일 또는 명함 이미지 (인증 완료 즉시 파기)\n- 소셜 로그인 시: 이름, 이메일, 내부 식별값",
      "제5조 (개인정보의 보유 및 파기)\n회사는 이용자가 회원 탈퇴를 요청하거나 수집 목적이 달성된 경우 지체 없이 해당 정보를 파기합니다.\n- 부정이용 방지: 탈퇴 후 1개월간 가입 정보를 보관하여 부정 재가입을 방지합니다.\n- 법령 보관: 결제 기록 5년, 접속 기록 3개월 보관합니다.",
      "제10조 (이용자의 권리)\n이용자는 언제든지 앱 내 설정에서 개인정보를 열람하거나 수정할 수 있으며, '너울 탈퇴하기'를 통해 즉시 회원 탈퇴 및 데이터 파기를 요청할 수 있습니다.",
    ],
  },
  location: {
    title: "콘텐츠 및 커뮤니티 정책",
    lastUpdated: "2026-02-20",
    content: [
      "1. 콘텐츠 활용 동의\n이용자는 '너울'에 게시하는 모든 게시물(사연)에 대하여 회사가 이를 영리적 목적으로 재가공, 편집, 복제, 배포할 수 있는 권리를 부여합니다. 회사는 이용자의 사연을 바탕으로 영상 콘텐츠 등을 제작할 수 있으며, 이때 이용자의 익명성은 철저히 보장됩니다.",
      "2. 커뮤니티 가이드라인\n너울은 익명성을 기반으로 한 신뢰와 존중의 커뮤니티를 지향합니다.\n- 비방 및 혐오: 특정 개인, 기업, 단체에 대한 근거 없는 비방이나 혐오 표현 금지\n- 아웃팅(Outing): 상대방이 원치 않는 개인정보나 신상을 공개하는 행위 금지 (적발 시 즉시 영구 정지)\n- 가이드라인 위반 시 수위에 따라 서비스 이용이 제한될 수 있습니다.",
      "3. 청소년 보호정책\n너울(Swell)은 성인 및 직장인을 대상으로 하는 서비스로, 실시간 연령 확인 시스템을 통해 만 19세 미만 청소년의 접근을 원천적으로 차단합니다.",
    ],
  },
};

export default function App() {
  const [activeTerm, setActiveTerm] = useState<TermType>("service");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [activeTerm]);

  const { title, lastUpdated, content } = termsData[activeTerm];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200">
                Swell
              </span>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden sm:flex items-center space-x-1">
              {(Object.entries(termsData) as [TermType, { title: string }][]).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setActiveTerm(key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTerm === key
                      ? "bg-neutral-800 text-indigo-400 shadow-sm"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
                  }`}
                >
                  {data.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row gap-12">
        {/* Mobile Navigation */}
        <aside className="sm:hidden flex overflow-x-auto pb-4 gap-2 scrollbar-none border-b border-neutral-800/50">
          {(Object.entries(termsData) as [TermType, { title: string }][]).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setActiveTerm(key)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTerm === key
                  ? "bg-neutral-800 text-indigo-400 border border-neutral-700"
                  : "bg-neutral-900/30 text-neutral-400 border border-transparent hover:bg-neutral-800/50"
              }`}
            >
              {data.title}
            </button>
          ))}
        </aside>

        {/* Sidebar Navigation */}
        <aside className="hidden sm:block w-64 shrink-0">
          <div className="sticky top-28 space-y-1">
            <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4 px-3">약관 및 정책</h2>
            {(Object.entries(termsData) as [TermType, { title: string }][]).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setActiveTerm(key)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTerm === key
                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                    : "text-neutral-400 border border-transparent hover:bg-neutral-800/50 hover:text-neutral-200"
                }`}
              >
                {data.title}
              </button>
            ))}
          </div>
        </aside>

        {/* Article Area */}
        <article className="flex-1 min-w-0 transition-opacity duration-500 pb-20 pt-2 lg:pt-0">
          <div
            className={`transition-all duration-500 ease-out transform ${
              isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            <div className="mb-12 border-b border-neutral-800/50 pb-8">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100 mb-3">{title}</h1>
              <p className="text-sm text-neutral-400 font-medium">
                최종 수정일: <time dateTime={lastUpdated}>{lastUpdated}</time>
              </p>
            </div>

            <div className="space-y-12">
              {content.map((paragraph, index) => {
                const [heading, ...body] = paragraph.split("\n");
                return (
                  <div key={index}>
                    <h3 className="text-xl font-semibold text-neutral-200 mb-4">{heading}</h3>
                    {body.map((line, lineIndex) => (
                      <p key={lineIndex} className="text-neutral-400 mb-2 leading-loose text-[0.95rem]">
                        {line}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </article>
      </main>

      <footer className="border-t border-neutral-900 mt-auto bg-neutral-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-neutral-600">&copy; 2026 Swell Co., Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
