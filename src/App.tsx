import { useState, useEffect } from "react";

type TermType = "service" | "privacy" | "location" | "youth" | "policy" | "marketing" | "payment";

const termsData: Record<TermType, { title: string; lastUpdated: string; content: string[] }> = {
  service: {
    title: "서비스 이용약관",
    lastUpdated: "2026-02-24",
    content: [
      "제 1 조 (목적)\n본 약관은 'Swell'(이하 '회사')이 운영하는 어플리케이션 및 관련 제반 서비스(이하 '서비스')를 이용함에 있어 '회사'와 이용자(이하 '회원') 간의 권리, 의무 및 책임사항, 서비스 이용 조건 및 절차 등 기본적인 사항을 규정함을 목적으로 합니다.",
      "제 2 조 (용어의 정의)\n1. '서비스'라 함은 접속 기기(PC, 스마트폰 등 유무선 장치)와 상관없이 '회원'이 이용할 수 있는 Swell 플랫폼을 의미합니다.\n2. '회원'이라 함은 '서비스'에 접속하여 본 약관에 따라 '회사'와 이용계약을 체결하고 '서비스'를 이용하는 자를 의미합니다.\n3. '게시물'이라 함은 '회원'이 '서비스'에 게시한 문자, 문서, 부호, 음성, 화상, 동영상 등 각종 파일과 링크 등을 의미합니다.\n4. 'SNS 연동'이라 함은 외부 플랫폼(카카오, 네이버, 구글 등)의 계정 정보를 활용하여 로그인하는 체계를 의미합니다.",
      "제 3 조 (약관의 명시, 효력 및 개정)\n1. '회사'는 본 약관의 내용을 '회원'이 쉽게 알 수 있도록 서비스 화면에 게시합니다.\n2. '회사'는 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.\n3. 약관을 개정할 경우 적용일자 및 사유를 명시하여 적용일자 7일 전부터 공지합니다. 단, !!'회원'에게 불리한 개정의 경우 30일 이상의 유예기간을 두고 알림, 전자우편 등을 통해 명확히 통지!!합니다.",
      "제 4 조 (이용계약의 체결)\n1. 이용계약은 가입신청자가 약관에 동의하고 가입 신청을 한 후 '회사'가 승낙함으로써 체결됩니다.\n2. '회사'는 다음 신청에 대해 승낙을 하지 않거나 사후 해지할 수 있습니다.\n  - 타인의 명의나 계정 정보 도용\n  - !!만 14세 미만 아동의 부적절한 가입 시도!!\n  - 허위 정보 기재 또는 회사가 제시하는 내용을 기재하지 않은 경우",
      "제 5 조 (회원정보의 변경 및 관리)\n'회원'은 개인정보관리화면을 통해 언제든지 정보를 수정할 수 있습니다. 수정한 사항을 '회사'에 알리지 않아 발생한 불이익에 대해 '회사'는 책임지지 않습니다.",
      "제 6 조 (개인정보보호 의무)\n'회사'는 관련 법령이 정하는 바에 따라 '회원'의 개인정보를 보호하기 위해 노력합니다. 상세 사항은 별도의 !!'개인정보 처리방침'!!이 적용됩니다.",
      "제 7 조 (회사의 의무)\n'회사'는 계속적이고 안정적으로 '서비스'를 제공하기 위하여 최선을 다하며, '회원'이 안전하게 이용할 수 있도록 보안 시스템을 갖추어야 합니다.",
      "제 8 조 (회원의 의무)\n'회원'은 다음 행위를 하여서는 안 됩니다.\n- 타인의 정보도용 및 허위내용 등록\n- !!외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 게시!!하는 행위\n- '회사'의 동의 없이 영리를 목적으로 서비스를 사용하는 행위\n- 제3자의 저작권 등 지식재산권을 침해하거나 명예를 손상시키는 행위",
      "제 9 조 (서비스의 제공 등)\n서비스는 연중무휴, 1일 24시간 제공을 원칙으로 하나, 설비 보수점검, 교체 및 고장 등 운영상 상당한 이유가 있는 경우 일시적으로 중단할 수 있습니다.",
      "제 10 조 (서비스의 변경 및 유료화)\n1. '회사'는 운영상, 기술상의 필요에 따라 제공하고 있는 서비스를 변경할 수 있습니다.\n2. 무료 서비스의 일부 또는 전부를 중단, 변경할 수 있으며 관련 법령에 특별한 규정이 없는 한 별도의 보상을 하지 않습니다.\n3. 유료 서비스 추가 시 상세 사항은 별도의 !!'유료 서비스 이용약관'!!에 따릅니다.",
      "제 11 조 (정보의 제공 및 광고의 게재)\n'회사'는 서비스 내 공지사항, 앱 푸시, 전자우편 등을 통해 정보를 제공할 수 있으며, 서비스 화면 등에 광고를 게재할 수 있습니다.",
      "제 12 조 (게시물의 저작권 및 관리)\n1. '게시물'의 저작권은 해당 저작자에게 귀속됩니다.\n2. '회사'는 !!제3자의 권리를 침해하거나 미풍양속에 반하는 게시물에 대해 사전 통지 없이 삭제!!하거나 등록 거부할 수 있습니다.",
      "제 13 조 (UGC 모니터링 및 신고 시스템)\n1. '회사'는 부적절 게시물을 차단하기 위해 !!실시간 필터링 시스템!!을 운영합니다.\n2. 이용자는 신고 기능을 통해 제보할 수 있으며, '회사'는 !!24시간 이내에 검토하여 조치!!하는 것을 원칙으로 합니다.\n3. 이용자는 특정 '회원'의 게시물이 노출되지 않도록 !!'차단(Block)' 기능!!을 사용할 수 있습니다.",
      "제 14 조 (이용계약 해지 및 정지)\n1. '회원'은 언제든지 탈퇴 기능을 통해 이용계약을 해지할 수 있습니다.\n2. '회사'는 약관 위반 시 !!주의, 경고, 일시정지, 영구정지!! 등으로 서비스 이용을 단계적으로 제한할 수 있습니다.",
      "제 15 조 (책임제한 및 면책조항)\n1. '회사'는 천재지변 및 불가항력으로 인한 서비스 불능에 대해 책임을 지지 않습니다.\n2. !!'회원'이 게재한 정보의 신뢰도 및 정확성에 대해 책임지지 않으며!!, 이용자 간 또는 제3자 간 분쟁에 개입할 의무가 없습니다.\n3. 특히 !!이용자 간의 오프라인 만남에서 발생한 모든 사고에 대한 책임은 당사자!!에게 있습니다.",
      "제 16 조 (손해배상 및 구상권)\n1. '회원'이 본 약관을 위반하여 '회사'에 손해를 입힌 경우 모든 손해를 배상해야 합니다.\n2. !!'회원'의 불법행위로 인해 '회사'가 제3자로부터 소송을 받는 경우, 해당 회원은 자신의 비용으로 회사를 면책!!시켜야 합니다.",
      "제 17 조 (위치기반 서비스 관련 조항)\n상세 사항은 별도의 !!'위치기반 서비스 이용약관'!!에 따르며, 회원은 언제든지 동의를 철회할 권리를 가집니다.",
      "제 18 조 (개별 약관 및 통지)\n1. 특정 기능에 대해 별도의 운영 정책을 둘 수 있으며, 상충 시 별도 정책이 우선합니다.\n2. 통지는 서비스 내 알림, 공지사항 게시 등으로 할 수 있습니다.",
      "제 19 조 (분쟁의 해결 및 준거법)\n1. 서비스 이용 중 발생한 분쟁은 대한민국 법을 준수하며, !!'회사'의 본점 소재지를 관할하는 법원!!을 관할 법원으로 하여 해결합니다.",
    ],
  },
  privacy: {
    title: "개인정보 처리방침",
    lastUpdated: "2026-02-24",
    content: [
      "'Swell'(이하 '회사')은 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.",
      "제 1 조 (개인정보의 처리 목적)\n회사는 다음의 목적을 위하여 개인정보를 처리합니다.\n1. **회원 가입 및 관리**: 회원 가입의사 확인, 이용자 식별·인증, 서비스 부정이용 방지, 각종 고지·통지.\n2. **서비스 제공**: 콘텐츠 제공, 특정 맞춤 서비스 제공, !!대략적 위치 기반 서비스(거리 표시 등)!! 제공.\n3. **마케팅 및 광고 활용**: 신규 서비스 개발, 서비스의 유효성 확인, 접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계 분석.",
      "제 2 조 (처리하는 개인정보의 항목)\n1. **수집 항목 (필수)**: SNS 고유 식별정보(고유 ID), 닉네임, 연령대, 성별\n2. **자동 수집**: 접속 IP, 접속 로그, 쿠키, 서비스 이용 기록, 기기 정보(모델명, OS), !!광고 식별자(ADID/IDFA)!!\n3. **위치정보 활용**: 사용자의 대략적인 위치 정보 (정확한 좌표는 수집 및 저장하지 않음)",
      "제 3 조 (개인정보의 처리 및 보유 기간)\n회사는 관계 법령이 규정하는 보존 기간 동안 개인정보를 보유합니다.\n1. **회원 탈퇴 시**: 즉시 파기. 단, 부정이용 방지를 위해 영구 정지된 회원의 식별값은 !!블랙리스트로서 영구 보관!!될 수 있습니다.\n2. **서비스 접속 로그, IP 정보**: !!3개월 (통신비밀보호법)!!\n3. **표시/광고에 관한 기록**: !!6개월 (전자상거래법)!!\n4. **소비자의 불만 또는 분쟁처리에 관한 기록**: !!3년 (전자상거래법)!!",
      "제 4 조 (개인정보의 파기절차 및 방법)\n- **파기절차**: 파기 사유가 발생한 개인정보를 선정하고, 책임자의 승인을 받아 파기합니다.\n- **파기방법**: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.",
      "제 5 조 (개인정보의 제3자 제공 및 위탁)\n회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를 국외 위탁하고 있습니다.\n- **수탁자 (국외 이전)**: !!Google LLC (Firebase / Google Cloud)!!\n- **위탁 업무**: 서비스 데이터 저장, 인프라 운영, 서비스 이용 분석\n- **이전 국가/일시**: 미국 / 서비스 이용 시점에 네트워크를 통해 실시간 전송",
      "제 6 조 (이용자 및 법정대리인의 권리와 행사방법)\n이용자는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있으며, 회사는 이에 대해 지체 없이 조치하겠습니다.",
      "제 7 조 (개인정보의 안전성 확보 조치)\n회사는 개인정보의 보호를 위해 다음과 같은 조치를 취하고 있습니다.\n- **관리적 조치**: 내부관리계획 수립 및 시행, 정기적 교육 등\n- **기술적 조치**: !!접근권한 관리, 접속 기록의 위변조 방지, 개인정보의 암호화!!, 보안프로그램 설치\n- **물리적 조치**: 데이터 저장소 등에 대한 접근통제 및 잠금장치 사용",
      "제 8 조 (개인정보 자동 수집 장치의 설치·운영 및 거부)\n- 회사는 맞춤형 광고 제공을 위해 !!광고 식별자(ADID/IDFA)!!를 수집할 수 있으며, 이용자는 모바일 기기 설정을 통해 이를 차단하거나 허용할 수 있습니다.\n- 쿠키 저장은 웹 브라우저 옵션 설정을 통해 거부할 수 있습니다.",
      "제 9 조 (탈퇴 시 게시물 처리 안내)\n!!가입 해지(탈퇴) 시 개인정보는 즉시 파기되나, 익명 커뮤니티의 특성상 이미 작성된 게시물과 댓글은 시스템적으로 자동 삭제되지 않습니다.!! 삭제를 원하는 게시물이 있는 경우 반드시 !!탈퇴 전 본인이 직접 삭제!!하셔야 합니다. 탈퇴 후에는 본인 확인이 불가능하여 회사가 대신 삭제해 드릴 수 없습니다.",
      "제 10 조 (개인정보 보호책임자)\n이용자의 고충처리 및 피해구제를 위하여 아래와 같이 보호책임자를 지정하고 있습니다.\n- 성명/닉네임: **Swell**\n- 직책: **개인정보 보호책임자**\n- 이메일: **nowul.dev@gmail.com**",
      "제 11 조 (권익침해 구제방법)\n- 개인정보침해신고센터: (국번없이) 118 / privacy.kisa.or.kr\n- 대검찰청 사이버수사과: (국번없이) 1301 / www.spo.go.kr\n- 경찰청 사이버수사국: (국번없이) 182 / ecrm.police.go.kr",
    ],
  },
  location: {
    title: "위치기반서비스 이용약관",
    lastUpdated: "2026-02-24",
    content: [
      "제 1 조 (목적)\n본 약관은 'Swell'(이하 '회사')이 제공하는 위치기반서비스(이하 '서비스')를 이용함에 있어 '회사'와 이용자(이하 '회원') 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.",
      "제 2 조 (약관 외 준칙)\n본 약관에 명시되지 않은 사항은 「위치정보의 보호 및 이용 등에 관한 법률」, 「개인정보 보호법」 등 관련 법령 및 회사가 별도로 정한 지침에 따릅니다.",
      "제 3 조 (서비스의 내용 및 요금)\n'회사'는 직접 수집하거나 위치정보사업자로부터 제공받은 위치정보를 활용하여 다음과 같은 서비스를 제공합니다.\n- **주변 이용자 간 거리 표시**: 회원의 현재 위치를 기준으로 타 회원과의 대략적인 거리(km)를 산출하여 표시하는 서비스\n- **위치 기반 콘텐츠 추천**: 회원의 현재 위치를 기반으로 한 지역 정보 또는 게시물 추천\n- '회사'가 제공하는 위치기반서비스는 !!무료를 원칙!!으로 합니다. 다만, 추후 서비스 정책에 따라 유료로 전환될 경우 사전에 고지하고 회원의 동의를 얻습니다.",
      "제 4 조 (위치정보 이용사실 확인자료의 보유근거 및 보유기간)\n1. '회사'는 「위치정보의 보호 및 이용 등에 관한 법률」 제16조 제2항에 따라 !!위치정보 이용·제공사실 확인자료를 6개월간 보존!!합니다.\n2. '회사'는 이용자가 동의를 철회한 경우, 법령에 따라 보존해야 하는 자료를 제외한 개인위치정보 및 확인자료를 지체 없이 파기합니다.",
      "제 5 조 (개인위치정보주체의 권리)\n이용자는 언제든지 위치정보 이용동의의 전부 또는 일부를 철회할 수 있으며, !!이용 또는 제공의 일시적인 중단을 요구!!할 수 있습니다. 또한 본인에 대한 위치정보 이용·제공사실 확인자료 및 제3자 제공 내용에 대한 열람 또는 고지를 요구할 수 있습니다.",
      "제 6 조 (법정대리인의 권리)\n'회사'는 만 14세 미만 아동의 개인위치정보를 이용·제공하고자 하는 경우에는 그 법정대리인의 동의를 얻어야 하며, 법정대리인은 본 약관 제5조에 따른 서 이용자의 권리를 모두 행사할 수 있습니다.",
      "제 7 조 (위치정보의 제3자 제공 시 통보)\n'회사'는 이용자의 동의 없이 개인위치정보를 제3자에게 제공하지 않습니다. 만약 제3자에게 위치정보를 제공할 경우, 제공받는 자, 제공 일시 및 제공 목적을 이용자에게 즉시 통보합니다.",
      "제 8 조 (손해배상 및 면책)\n1. '회사'가 관련 법령을 위반하여 이용자에게 손해가 발생한 경우 이용자는 손해배상을 청구할 수 있습니다.\n2. 회사는 !!정확한 좌표값이 아닌 '대략적인 위치'를 기반!!으로 서비스를 제공하므로, 거리 계산의 오차로 인해 발생한 주관적 불만족에 대해서는 면책됩니다.",
      "제 9 조 (위치정보관리책임자의 지정)\n회사는 위치정보를 적절히 관리·보호하기 위해 책임자를 지정하고 있습니다.\n- 성명: **Swell**\n- 직위: **위치정보 관리책임자**\n- 이메일: **nowul.dev@gmail.com**",
    ],
  },
  youth: {
    title: "청소년 보호정책",
    lastUpdated: "2026-02-24",
    content: [
      "'Swell'(이하 '회사')은 청소년이 건전한 인격체로 성장할 수 있도록 돕고, 유해한 환경으로부터 보호하며 안전한 인터넷 이용 환경을 조성하기 위하여 관련 법령에 근거하여 다음과 같은 청소년 보호정책을 수립·시행하고 있습니다.",
      "제 1 조 (청소년 보호를 위한 기본 원칙)\n회사는 청소년들이 유해 정보에 노출되지 않도록 하는 것을 최우선 과제로 삼으며, 관련 법령이 정한 !!기술적·관리적 보호 조치!!를 전방위적으로 이행합니다.",
      "제 2 조 (청소년 유해 정보의 정의 및 규제 대상)\n회사는 다음 각 호를 청소년 유해 정보로 정의하고 엄격히 규제합니다.\n- 음란한 내용을 담은 텍스트 및 관련 정보\n- 폭력적이고 잔인한 내용\n- !!성매매, 조건 만남, 마약류 유통, 불법 도박!! 등 범죄를 유도하는 내용\n- 특정 집단에 대한 혐오 표현, 심각한 비속어 및 인신공격",
      "제 3 조 (청소년 유해 정보로부터의 보호 계획 수립)\n회사는 매년 종합 계획을 수립하며, 유해 정보 유통을 원천 차단하기 위한 !!운영 지침 및 전담 인력!!을 배정하여 지속적으로 최신화합니다.",
      "제 4 조 (청소년 유해 정보에 대한 접근 제한 및 관리 조치)\n- **기술적 차단**: 유해 키워드 금칙어 DB를 상시 업데이트하며, !!시스템이 실시간으로 감지하여 등록을 제한!!합니다.\n- **연령 확인 시스템**: SNS 연동을 통한 인증된 연령 정보를 기반으로 기술적 장치를 운영합니다.\n- **UGC 관리**: 부적절 콘텐츠는 즉각 블라인드 처리하며, !!24시간 이내에 최종 검토 및 삭제!!를 완료합니다.",
      "제 5 조 (정보통신업무 종사자에 대한 교육)\n회사는 청소년 보호 업무 담당자를 대상으로 관련 법령 및 대처 요령에 관한 교육을 **연 1회 이상 실시**합니다.",
      "제 6 조 (청소년 유해 정보로 인한 피해 상담 및 고충 처리)\n회사는 이용자가 유해 정보를 발견할 경우 즉시 제보할 수 있도록 서비스 내 !!'신고 기능'!!을 상시 운영하며, 전담 관리자를 배정하여 피해 확산을 방지합니다.",
      "제 7 조 (관련 기관 안내 - 외부 신고 및 상담)\n- 방송통신심의위원회 불법·유해정보 신고센터: https://www.kocsc.or.kr / 1377\n- 디지털 성범죄 피해자 지원센터: https://d4u.stop.or.kr / 02-735-8994\n- 경찰청 사이버수사국: https://ecrm.police.go.kr / 182\n- 개인정보침해신고센터: https://privacy.kisa.or.kr / 118\n- 스마트쉼센터 (인터넷/스마트폰 중독 예방): https://www.iapc.or.kr / 1599-0075\n- 청소년권익보호협회: http://www.youthrights.or.kr / 02-2181-1000",
      "제 8 조 (청소년 보호 책임자 및 담당자 지정)\n회사는 청소년 보호를 담당하는 책임자를 다음과 같이 지정하고 있습니다.\n\n[청소년 보호 책임자]\n- 성명/닉네임: **Swell**\n- 소속/직위: **Swell 운영팀 / 팀장 (청소년 보호 책임자)**\n- 이메일: **nowul.dev@gmail.com**\n\n[청소년 보호 담당자]\n- 성명/닉네임: **Swell**\n- 소속/직위: **Swell 운영팀 / 담당자 (청소년 보호 실무자)**\n- 이메일: **nowul.dev@gmail.com**",
    ],
  },
  policy: {
    title: "커뮤니티 이용 가이드",
    lastUpdated: "2026-02-24",
    content: [
      "제 1 조 (목적 및 운영 원칙)\nSwell은 사회생활의 고민과 일상을 익명으로 나누는 소통 공간입니다. 회사는 이용자의 표현의 자유를 최대한 보장하되, 타인의 권리를 침해하거나 서비스의 본질을 훼손하는 행위에 대해서는 강력하게 대응합니다.",
      "제 2 조 (금지 게시물 및 콘텐츠 세부 규정)\n이용자는 서비스 내에서 다음과 같은 게시물을 작성할 수 없습니다.\n- **욕설, 비방 및 인신공격**: 특정 이용자 또는 제3자를 향한 직접적·간접적인 욕설, 외모 비하, 학력/직업 차별, 특정 유저를 타겟으로 괴롭히는 !!'저격' 행위!!\n- **청소년 유해 정보 및 음란물**: !!노골적인 성인용 텍스트!!, 불법 촬영물, 성매매/조건 만남 유도 (발견 즉시 사법기관 신고 및 데이터 보존)\n- **불법 행위 및 사행성 조장**: 마약류 유통, 도박 홍보, 자살 조장, 보이스피싱, 불법 대출 광고 등\n- **개인정보 노출 및 권리 침해 (도싱/Doxing)**: 본인 동의 없이 타인의 성명, 연락처, 사진, 주소, 직장 정보 등을 게시하는 행위, 저작권 및 초상권 침해\n- **혐오 조장 및 차별 표현**: 인종, 성별, 지역, 종교 등을 이유로 특정 집단을 비하하거나 !!혐오를 정당화하는 표현!!",
      "제 3 조 (서비스 운영 방해 행위)\n- **스팸 및 도배**: 동일하거나 유사한 내용을 반복 게시하여 가독성을 해치는 행위\n- **상업적 홍보**: 운영자 허가 없이 특정 업체, 상품, 타 커뮤니티를 홍보하는 행위\n- **시스템 악용**: !!매크로, 프로그램 등을 이용한 비정상적인 게시물 작성!! 및 서버 부하 유발\n- **사칭 행위**: 운영자, 회사 임직원 또는 공인을 사칭하여 신뢰를 해치는 행위",
      "제 4 조 (사용자 생성 콘텐츠(UGC) 관리 의무)\n- **24시간 이내 대응**: 회사는 신고된 부적절 게시물에 대하여 !!24시간 이내에 검토를 완료!!하고 삭제 및 제한 조치를 취하는 것을 원칙으로 합니다.\n- **신고 시스템**: 모든 회원은 가이드라인 위반 게시물 발견 시 !!'신고' 기능!!을 통해 제보해야 합니다.\n- **차단 기능**: 이용자는 불쾌감을 주는 특정 이용자가 보이지 않도록 !!'차단' 기능!!을 즉시 사용할 수 있습니다.",
      "제 5 조 (단계별 이용 제한 기준)\n회사는 위반 행위의 경중과 빈도에 따라 다음과 같은 제재를 적용합니다.\n- **1단계 (주의/경고)**: 해당 게시물 삭제 (단순 비속어 사용 등)\n- **2단계 (기간제 정지)**: !!3일~30일 이용 제한!! (경고 후 재범, 지속적인 스팸 등)\n- **3단계 (영구 정지)**: !!서비스 영구 퇴출!! (불법물 유포, 범죄 모의, 도용 가입 등)\n!!다수의 조항을 동시에 위반하거나 제재 회피를 위해 반복적으로 계정을 생성하는 경우 가중 제재를 적용할 수 있습니다.!!",
      "제 6 조 (강력 블랙리스트 및 기기 차단)\n- **식별값 보존**: 영구 정지된 회원의 식별값(UUID, ADID/IDFA 등)은 !!별도의 보안 서버에 암호화되어 저장!!됩니다.\n- **재가입 차단**: 블랙리스트에 등록된 기기 및 계정 정보의 접속 시도는 !!시스템에 의해 즉시 차단!!되며, 재가입이 허용되지 않습니다.\n- **수사 협조**: 중대한 위반 행위의 경우 회사는 데이터를 사법기관에 증거 자료로 제공할 수 있습니다.",
      "제 7 조 (이의 신청 및 소명 절차)\n이용 제한 조치에 이의가 있는 회원은 제재일로부터 7일 이내에 소명 자료를 제출할 수 있으며, 회사는 !!타당하다고 인정될 경우 제재를 해제!!하거나 경감할 수 있습니다.",
      "제 8 조 (면책 사항)\n- 회사는 이용자가 작성한 게시물 내용에 대해 어떠한 보증도 하지 않습니다.\n- !!이용자 간의 사적 만남이나 서비스 외부에서의 행위!!로 발생한 모든 분쟁에 대해 회사는 책임을 지지 않습니다.",
    ],
  },
  marketing: {
    title: "마케팅 정보 수신 동의",
    lastUpdated: "2026-02-24",
    content: [
      "'Swell'(이하 '회사')은 관련 법령에 따라, 이용자에게 최적화된 맞춤형 서비스와 유용한 정보를 제공하기 위해 마케팅 정보 수신 동의를 지침에 따라 관리합니다.",
      "제 1 조 (수집 및 이용 목적)\n회사는 다음의 목적을 위해 마케팅 정보를 전송합니다.\n- **신규 서비스 및 기능 안내**: 업데이트 정보, 신규 런칭 안내\n- **이벤트 및 프로모션 소식**: 각종 이벤트 혜택, 경품 증정 광고성 정보 전송\n- **맞춤형 광고 제공**: 이용 기록 및 특성에 기반한 콘텐츠 추천 및 광고 게재\n- **서비스 개선 및 시장조사**: 만족도 조사 및 통계적 분석",
      "제 2 조 (활용하는 개인정보 항목)\n- **필수 활용**: 닉네임, SNS 식별 정보, 연령대, 성별\n- **서비스 이용**: 방문 빈도, 게시물 작성 패턴, !!앱 푸시 토큰(Token)!!\n- **기기 식별**: !!광고 식별자(ADID, IDFA)!!",
      "제 3 조 (전송 방법 및 명시 사항)\n- **전송 매체**: 앱 푸시(App Push), 전자우편(E-mail), 배너 및 팝업\n- **명시 사항**: 광고성 정보 전송 시 시작 부분에 !!'(광고)'를 표시!!하며, 수신 거부 방법을 명확히 안내합니다.",
      "제 4 조 (전송 시간 및 야간 전송 제한)\n광고성 정보의 전송은 일반 업무 시간(08시~21시)에 이루어지며, !!오후 9시부터 다음 날 오전 8시까지의 야간 시간 전송을 엄격히 금지!!합니다 (별도 야간 동의자 제외).",
      "제 5 조 (수신 동의 여부의 확인)\n회사는 「정보통신망법」에 따라 !!매 2년마다 이용자의 수신 동의 여부를 정기적으로 확인!!합니다.",
      "제 6 조 (개인정보 보유 및 이용 기간)\n- **동의 시점부터 회원 탈퇴 또는 동의 철회 시까지** 보관 및 이용합니다.\n- 동의 철회 시 마케팅 목적으로 수집된 해당 정보를 지체 없이 파기합니다.",
      "제 7 조 (동의 거부 권리 및 불익 안내)\n본 동의는 선택 사항이며, 거부하더라도 !!Swell의 기본 커뮤니티 서비스 이용에는 어떠한 제한도 없습니다.!! 단, 맞춤형 혜택 누락 등 편의가 일부 제한될 수 있습니다.",
      "제 8 조 (동의 철회 방법)\n이용자는 언제든지 !![설정 > 알림 설정]!! 또는 !![고객센터 문의]!!를 통해 수신 동의를 철회(수신 거부)할 수 있습니다.",
    ],
  },
  payment: {
    title: "유료 서비스 이용 및 환불 약관",
    lastUpdated: "2026-02-24",
    content: [
      "제 1 조 (목적 및 정의)\n본 약관은 'Swell'(이하 '회사')이 제공하는 유료 아이템, 콘텐츠, 정기구독 서비스 등(이하 '유료 서비스')의 이용 조건 및 환불에 관한 상세 사항을 규정함을 목적으로 합니다.\n- **유료 서비스**: '회사'가 유상으로 제공하는 각종 온라인 콘텐츠 및 제반 서비스\n- **결제**: 이용자가 앱 마켓(Google Play, App Store)을 통해 대금을 지불하는 행위",
      "제 2 조 (이용계약의 성립 및 미성년자 결제)\n1. 이용계약은 회원이 약관에 동의하고 결제를 완료함으로써 성립합니다.\n2. !!미성년 회원이 결제할 경우 반드시 법정대리인의 동의!!를 얻어야 하며, 동의 없는 결제는 취소할 수 있습니다. 단, 미성년자가 속임수를 사용하여 성년자로 믿게 한 경우 등은 취소가 제한될 수 있습니다.",
      "제 3 조 (결제 및 이용 방법)\n- 구매한 서비스의 이용 기간은 별도 고지된 기간에 따르며, 명시되지 않은 경우 서비스 종료 시까지로 합니다.\n- 유료 서비스는 !!결제한 SNS 계정에 귀속!!되며, 타인에게 양도, 대여, 매매할 수 없습니다.",
      "제 4 조 (청약철회 및 환불 기준)\n1. **7일 이내 청약철회**: 사용하지 않은 '유료 서비스'는 !!구매일로부터 7일 이내!!에 별도 수수료 없이 환불을 요청할 수 있습니다.\n2. **콘텐츠 결함**: 내용이 광고와 다르거나 계약과 다르게 이행된 경우, 공급받은 날로부터 3개월 이내 또는 사실을 안 날로부터 30일 이내에 환불 가능합니다.",
      "제 5 조 (청약철회 및 환불의 제한)\n다음의 경우에는 청약철회가 제한됩니다.\n- !!구매 즉시 효력이 발생하거나 서비스에 즉시 적용되어 소모되는 아이템!!\n- 패키지 상품 중 일부를 이미 사용한 경우\n- 이벤트로 무상 제공받은 아이템\n- !!'선물하기' 기능을 통해 타인에게 전달 완료!!된 콘텐츠",
      "제 6 조 (환불 절차 및 대금의 지급)\n1. 환불은 !!앱 마켓(Google/Apple) 고객센터를 통해 신청!!하는 것을 원칙으로 하며, 마켓 사업자의 정책에 따라 진행됩니다.\n2. 환불 시 앱 마켓 정책에 따른 수수료 등이 차감된 금액이 환불될 수 있습니다.",
      "제 7 조 (과오금의 환불)\n- 회사의 고의/과실로 인한 과오금은 전액 환불합니다.\n- !!이용자의 귀책사유로 발생한 과오금!!의 환불에 소요되는 비용은 합리적인 범위 내에서 이용자가 부담합니다.",
      "제 8 조 (서비스 중단 및 종료 시 처리)\n1. 서비스 종료 시 종료 30일 이전에 공지합니다.\n2. 기한이 없는 무제한 아이템은 서비스 종료 시점까지를 이용 기간으로 보며, !!종료 후 미사용 잔여분에 대한 환불 책임은 발생하지 않습니다.!! (단, 기간제 구독 상품은 정산 후 환불)",
      "제 9 조 (부정 이용에 따른 제재 및 환불 금지)\n!!타인 결제 도용, 시스템 취약점 이용, 환불 정책 악용(Refund Abusing)!! 적발 시 계정이 영구 정지될 수 있으며, 이 경우 미사용 유료 서비스에 대한 환불은 제한될 수 있습니다.",
      "제 10 조 (준거법 및 분쟁 해결)\n본 약관의 해석 및 분쟁에 대해서는 대한민국 법령을 적용하며, !!'회사'의 본점 소재지 관할 법원!!을 통해 해결합니다.",
    ],
  },
};

export default function App() {
  const [activeTerm, setActiveTerm] = useState<TermType>("service");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 스크롤 위치 감지 (Top 버튼 노출용)
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // URL 해시(#)에 따른 초기 탭 설정 및 해시 변경 감지
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const hashMapping: Record<string, TermType> = {
        "#privacy": "privacy",
        "#youth": "youth",
        "#guidelines": "policy",
        "#location": "location",
        "#marketing": "marketing",
        "#payment": "payment",
        "#service": "service",
      };

      if (hash && hashMapping[hash]) {
        setActiveTerm(hashMapping[hash]);
      }
    };

    handleHashChange(); // 초기 로드 시 실행
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [activeTerm]);

  const { title, lastUpdated, content } = termsData[activeTerm];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-indigo-500/40 selection:text-white">
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-purple-500/5 blur-[100px] rounded-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-[100] bg-neutral-950/70 backdrop-blur-2xl border-b border-neutral-800/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div
              className="flex items-center gap-3 sm:gap-4 group cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 blur-md rounded-2xl group-hover:bg-indigo-500/40 transition-all duration-500" />
                <img
                  src="src/images/icon.png"
                  alt="Swell Logo"
                  className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl object-cover border border-neutral-800/50"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-indigo-100 to-indigo-300">
                  Swell
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500 -mt-1 ml-0.5">
                  Legal Center
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a
                href="https://minkkaeng.github.io/Swell-docs/"
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
              >
                홈페이지
              </a>
              <a
                href="mailto:nowul.dev@gmail.com"
                className="px-5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-full text-sm font-semibold hover:bg-neutral-800 transition-all active:scale-95 shadow-lg shadow-black/20"
              >
                문의하기
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 flex flex-col md:flex-row gap-8 lg:gap-16">
        {/* Mobile Navigation - Sticky Bar Style */}
        <nav className="md:hidden sticky top-16 z-[90] bg-neutral-950/90 backdrop-blur-lg -mx-4 px-4 py-3 border-b border-neutral-900 overflow-x-auto no-scrollbar flex gap-2">
          {(Object.entries(termsData) as [TermType, { title: string }][]).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setActiveTerm(key)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 border ${
                activeTerm === key
                  ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/20"
                  : "bg-neutral-900 text-neutral-500 border-neutral-800 hover:text-neutral-300"
              }`}
            >
              {data.title}
            </button>
          ))}
        </nav>

        {/* Sidebar Navigation - Premium Side Rail */}
        <aside className="hidden md:block w-72 shrink-0">
          <div className="sticky top-32">
            <h2 className="text-[11px] font-bold text-neutral-500 uppercase tracking-[0.15em] mb-6 px-4">내용 목차</h2>
            <div className="space-y-1">
              {(Object.entries(termsData) as [TermType, { title: string }][]).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setActiveTerm(key)}
                  className={`group relative w-full text-left px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-500 flex items-center justify-between ${
                    activeTerm === key
                      ? "bg-indigo-500/5 text-indigo-400"
                      : "text-neutral-500 hover:bg-neutral-900/50 hover:text-neutral-300"
                  }`}
                >
                  <span className="relative z-10">{data.title}</span>
                  {activeTerm === key && (
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] animate-pulse" />
                  )}
                  {/* Active Indicator Bar */}
                  {activeTerm === key && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-indigo-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Download Button Shadow Box */}
            <div className="mt-12 p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800/50 backdrop-blur-sm">
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Swell은 투명한 운영 정책을 준수하며, 사용자의 권리 보호를 최우선으로 합니다.
              </p>
              <button
                onClick={() => window.print()}
                className="w-full py-3 rounded-xl bg-neutral-800 text-white text-xs font-bold border border-neutral-700 hover:bg-neutral-700 transition-all flex items-center justify-center gap-2"
              >
                📥 PDF로 출력하기
              </button>
            </div>
          </div>
        </aside>

        {/* Article Area */}
        <article className="flex-1 min-w-0">
          <div
            className={`transition-all duration-700 ease-out transform ${
              isAnimating ? "opacity-0 translate-y-8 scale-[0.98]" : "opacity-100 translate-y-0 scale-100"
            }`}
          >
            <div className="mb-10 sm:mb-16">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-indigo-500/10 text-indigo-400 text-[9px] sm:text-[10px] font-bold rounded-full border border-indigo-500/20 uppercase tracking-wider">
                  Policy Update
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 sm:mb-6 leading-[1.2] sm:leading-[1.1]">
                {title}
              </h1>
              <div className="flex items-center gap-3 sm:gap-4 text-neutral-500">
                <span className="text-xs sm:text-sm font-medium">최종 업데이트</span>
                <div className="w-3 sm:w-4 h-[1px] bg-neutral-800" />
                <time className="text-xs sm:text-sm font-bold text-neutral-300" dateTime={lastUpdated}>
                  {lastUpdated}
                </time>
              </div>
            </div>

            <div className="space-y-10 sm:space-y-16">
              {content.map((paragraph, index) => {
                const [heading, ...body] = paragraph.split("\n");
                return (
                  <section key={index} className="group">
                    <div className="flex items-baseline gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <span className="text-indigo-500/50 font-mono text-xs sm:text-sm group-hover:text-indigo-500 transition-colors">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <h3 className="text-lg sm:text-2xl font-bold text-neutral-100 tracking-tight group-hover:text-white transition-colors">
                        {heading}
                      </h3>
                    </div>

                    <div className="pl-7 sm:pl-9 space-y-3 sm:space-y-4">
                      {body.map((line, lineIndex) => (
                        <p key={lineIndex} className="text-neutral-400 leading-relaxed text-[0.9rem] sm:text-base">
                          {line.split(/(\*\*.*?\*\*|!!.*?!!)/g).map((part, i) => {
                            if (part.startsWith("**") && part.endsWith("**")) {
                              return (
                                <strong key={i} className="text-neutral-100 font-bold bg-neutral-800/30 px-1 rounded">
                                  {part.slice(2, -2)}
                                </strong>
                              );
                            }
                            if (part.startsWith("!!") && part.endsWith("!!")) {
                              return (
                                <span
                                  key={i}
                                  className="relative inline-block px-1 font-bold text-white group/highlight"
                                >
                                  <span className="relative z-10">{part.slice(2, -2)}</span>
                                  <span className="absolute inset-x-0 bottom-[10%] h-[35%] bg-indigo-500/40 -z-0 rounded-sm group-hover/highlight:h-[70%] transition-all duration-300" />
                                </span>
                              );
                            }
                            return part;
                          })}
                        </p>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>

            <div
              className="mt-16 sm:mt-24 pt-10 sm:pt-12 border-t border-neutral-900 group cursor-pointer hover:border-neutral-800 transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <p className="text-center text-neutral-500 text-xs sm:text-sm font-medium group-hover:text-neutral-400 transition-colors">
                모든 내용을 확인하셨습니다. 맨 위로 가기 ↑
              </p>
            </div>
          </div>
        </article>
      </main>

      {/* Floating Action Buttons */}
      <div
        className={`fixed bottom-8 right-8 z-[200] flex flex-col gap-3 transition-all duration-500 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-3.5 sm:p-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl hover:bg-white/20 transition-all active:scale-90 group"
          aria-label="맨 위로"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:-translate-y-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>

      <footer className="relative border-t border-neutral-900 bg-neutral-950 pt-16 sm:pt-20 pb-10 sm:pb-12 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col items-center">
          <div className="flex items-center gap-2 opacity-30 grayscale mb-6 sm:mb-8">
            <img src="src/images/icon.png" alt="Swell Logo" className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg grayscale" />
            <span className="font-bold tracking-tighter text-sm sm:text-base">Swell</span>
          </div>
          <p className="text-center text-[10px] sm:text-xs text-neutral-600 font-medium tracking-wide">
            &copy; 2026 Swell Co., Ltd. All rights reserved.
          </p>
          <p className="text-center text-[9px] sm:text-[10px] text-neutral-800 mt-2">
            All contents are optimized for the latest mobile and desktop browsers.
          </p>
        </div>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
