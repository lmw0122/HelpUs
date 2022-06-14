package com.ssafy.helpus.donation.service;

import com.ssafy.helpus.donation.dto.NewsDto;
import com.ssafy.helpus.utils.Message;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@Service
public class NaverSearchService {

    @Value("${api.naver.clientId}")
    private String clientId;
    @Value("${api.naver.clientSecret}")
    private String clientSecret;

    public Map<String, Object> getNews(Integer page) throws Exception{
        log.debug("NaverSearchService getNews call");

        Map<String, Object> resultMap = new HashMap<>();
        String text = "기부";
        try {
            text = URLEncoder.encode(text, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            log.error("검색어 인코딩 실패: {}", e.getMessage());
            throw new RuntimeException("검색어 인코딩 실패", e);
        }

        String apiURL = "https://openapi.naver.com/v1/search/news?query=" + text + "&start=" + page; // json 결과

        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("X-Naver-Client-Id", clientId);
        requestHeaders.put("X-Naver-Client-Secret", clientSecret);
        String responseBody = get(apiURL, requestHeaders);

        JSONParser parser = new JSONParser();
        JSONObject obj = (JSONObject) parser.parse(responseBody);
        JSONArray items = (JSONArray) obj.get("items");

        List<NewsDto> list = new ArrayList<>();
        for (int i = 0; i < items.size(); i++) {
            NewsDto news = new NewsDto((JSONObject) items.get(i));

            news.setTitle(news.getTitle().replaceAll("&nbsp;", " ").replaceAll("<br>", "\r\n").
                    replaceAll("&quot;", "\"").replaceAll("&gt;", ">").replaceAll("<b>", "").replaceAll("</b>", ""));
            news.setDescription(news.getDescription().replaceAll("&nbsp;", " ").replaceAll("<br>", "\r\n").replaceAll("&quot;", "\"").
                    replaceAll("&gt;", ">").replaceAll("<b>", "").replaceAll("</b>", "").replaceAll("◀ＶＣＲ▶", "").replaceAll("◀ＥＮＤ▶", ""));

            SimpleDateFormat fDate = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss Z", Locale.ROOT);
            SimpleDateFormat nDate = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            Date sDate = fDate.parse(news.getDate());
            news.setDate(nDate.format(sDate));

            list.add(news);
        }

        if(!list.isEmpty()) {
            resultMap.put("message", Message.FIND_NEWS_SUCCESS);
            resultMap.put("news", list);
            resultMap.put("totalPage", 100);
        } else {
            resultMap.put("message", Message.NOT_FOUND_NEWS);
        }

        return resultMap;
    }

    public String get(String apiUrl, Map<String, String> requestHeaders) {
        log.debug("NaverSearchService get call");

        HttpURLConnection con = connect(apiUrl);
        try {
            con.setRequestMethod("GET");
            for (Map.Entry<String, String> header : requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 호출
                return readBody(con.getInputStream());
            } else { // 에러 발생
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            log.error("API 요청과 응답 실패: {}", e.getMessage());
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect();
        }
    }

    private HttpURLConnection connect(String apiUrl) {
        log.debug("NaverSearchService connect call");

        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection) url.openConnection();
        } catch (MalformedURLException e) {
            log.error("API URL이 잘못되었습니다: {}", e.getMessage());
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            log.error("연결이 실패했습니다: {}", e.getMessage());
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }

    private String readBody(InputStream body) {
        log.debug("NaverSearchService readBody call");

        InputStreamReader streamReader = new InputStreamReader(body);
        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            StringBuilder responseBody = new StringBuilder();

            String line;
            while ((line = lineReader.readLine()) != null) {
                responseBody.append(line);
            }
            return responseBody.toString();
        } catch (IOException e) {
            log.error("API 응답을 읽는데 실패했습니다: {}", e.getMessage());
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
        }
    }
}
