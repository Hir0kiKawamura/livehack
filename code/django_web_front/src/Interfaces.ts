
export interface infoObj {
    title: string;
    annotation: string;
}

export interface windowDimension {
    width: number;
    height: number;
}

export interface prefectureInfo {
    name_ja: string;
    id: string;
}

export interface Context {
    // モバイルか？
    isMobileSite: boolean;
    // タブレットか？
    isTabletSite: boolean;
    // PCか？
    isPcSite: boolean;
};