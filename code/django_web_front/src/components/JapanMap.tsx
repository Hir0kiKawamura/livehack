import * as d3 from "d3";
import React, { useRef } from "react";
// GeoJsonファイルを読み込み
//import geoJson from "../../data/japan.geo.json";
import { GeoPath } from "d3";
import GeoData from "../GeoData";
import { useEffect } from "react";
import { Context } from "src/Interfaces";

interface OwnProps {
    deviceType: Context
}

const JapanMap: React.FC<OwnProps> = (props: OwnProps) => {

    const d3Container = useRef(null);

    useEffect(() => {
        createJapanMap();
    }, [d3Container.current])

    const createJapanMap = async () => {

        if (d3Container.current) {
            const mapProp = {
                width: 500,
                height: 250,
                centerPos: [137.0, 38.2], //地図のセンター位置
                scale: 500 //地図のスケール
            }

            if (props.deviceType.isPcSite || props.deviceType.isTabletSite) {
                mapProp.width = 800;
                mapProp.height = 400;
                mapProp.scale = 600;
            }

            // 地図の投影設定
            const projection = d3
                .geoMercator()
                .center([mapProp.centerPos[0], mapProp.centerPos[1]])
                .translate([mapProp.width / 2, mapProp.height / 2])
                .scale(mapProp.scale);

            // 地図をpathに投影(変換)
            const path: GeoPath<any, any> = d3.geoPath().projection(projection);

            // SVG要素を追加
            const svg = d3
                .select(d3Container.current)
                .append(`svg`)
                .attr(`viewBox`, `0 0 ${mapProp.width} ${mapProp.height}`)
                .attr(`width`, `100%`)
                .attr(`height`, `100%`)
                .attr(`id`, `map-svg`);

            // 動的にGeoJsonファイルを読み込む場合は以下のコードを使用
            const geoJson = GeoData;

            // 都道府県の領域データをpathで描画
            svg
                .selectAll(`path`)
                .data(geoJson.features)
                .enter()
                .append(`path`)
                .attr(`d`, path)
                .attr(`stroke`, `#666`)
                .attr(`stroke-width`, 0.25)
                .attr(`fill`, `#2566CC`)
                .attr(`fill-opacity`, (item: any) => {
                    return 0.25;
                })

                /**
         * 都道府県領域の MouseOver イベントハンドラ
         */
                .on(`mouseover`, function (event: MouseEvent, data) {
                    // ラベル用のグループ
                    const group = svg.append(`g`).attr(`id`, `label-group`);

                    // 地図データから都道府県名を取得する
                    const label = data.properties.name_ja;

                    // 矩形を追加: テキストの枠
                    const rectElement = group
                        .append(`rect`)
                        .attr(`id`, `label-rect`)
                        .attr(`stroke`, `#666`)
                        .attr(`stroke-width`, 0.5)
                        .attr(`fill`, `#fff`);

                    // テキストを追加
                    const textElement = group
                        .append(`text`)
                        .attr(`id`, `label-text`)
                        .text(label);

                    // テキストのサイズから矩形のサイズを調整
                    const padding = { x: 5, y: 0 };
                    const textSize = textElement.node().getBBox();
                    rectElement
                        .attr(`x`, textSize.x - padding.x)
                        .attr(`y`, textSize.y - padding.y)
                        .attr(`width`, textSize.width + padding.x * 2)
                        .attr(`height`, textSize.height + padding.y * 2);

                    // マウス位置の都道府県領域を赤色に変更
                    d3.select(this).attr(`fill`, `#CC4C39`);
                    d3.select(this).attr(`stroke-width`, `1`);
                })

                /**
                 * 都道府県領域の MouseMove イベントハンドラ
                 */
                .on("mousemove", function (event: MouseEvent, data) {

                    // テキストのサイズ情報を取得
                    const textSize = document.getElementById("label-text");
                    // const textSize = svg
                    //     .select<SVGGraphicsElement>("#label-text")
                    //     .getBBox();

                    // マウス位置からラベルの位置を指定
                    const labelPos = {
                        x: event.offsetX - textSize.clientWidth,
                        y: event.offsetY - textSize.clientWidth
                    };

                    // ラベルの位置を移動
                    svg
                        .select("#label-group")
                        .attr(`transform`, `translate(${labelPos.x}, ${labelPos.y})`);
                })

                /**
                 * 都道府県領域の MouseOut イベントハンドラ
                 */
                .on(`mouseout`, function (event: MouseEvent, data) {
                    // ラベルグループを削除
                    svg.select("#label-group").remove();

                    // マウス位置の都道府県領域を青色に戻す
                    d3.select(this).attr(`fill`, `#2566CC`);
                    d3.select(this).attr(`stroke-width`, `0.25`);
                })

                .on(`click`, (event: MouseEvent, data) => {

                    window.alert(data.properties.name_ja);

                });
        }
    }

    return (
        <div ref={d3Container} />
    )
}

export default JapanMap;
