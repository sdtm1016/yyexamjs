import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;



public class Test {
	static String basePath="D:/wamp/www/yyexamjs/";
	static String basePath1="http://t3online.chanjet.com/yyexamjs/";
	public static void main(String[] args) throws Exception {
		//copyFile("http://t3online.chanjet.com/yyexamjs/jsp/portal/WD.html");
		//copyFile("http://t3online.chanjet.com/yyexamjs/jsp/portal/MR.html");
		getMissingFile();
	}

	private static void getMissingFile() throws IOException,
			MalformedURLException {
		File file=new File(basePath+"missing.txt");
		List list=FileUtils.readLines(file);
		for (Iterator it = list.iterator(); it.hasNext();) {
			String url = (String) it.next();
			if(url.indexOf("http")>-1){
				url=url.replaceAll("localhost", "t3online.chanjet.com");
				url=url.substring(url.indexOf("http"));
				if(url.startsWith("GET")){
					url=url.substring(4);
				}
				if(url.indexOf(".png")>-1){
					url=url.substring(0, url.indexOf(".png")+4);
				}
				if(url.indexOf(".jpg")>-1){
					url=url.substring(0, url.indexOf(".jpg")+4);
				}
				if(url.indexOf(".gif")>-1){
					url=url.substring(0, url.indexOf(".gif")+4);
				}
				if(url.indexOf("!")>-1){
					String[] arr=url.split("!");
					String urlPath=url.split(" ")[0];
					String filePath=basePath+url.substring(url.indexOf("/yyexamjs")+10,url.lastIndexOf("/"))+"/data/"+arr[1].substring(0,arr[1].indexOf("."))+".json";
					System.out.println(filePath);
					//FileUtils.copyURLToFile(new URL(urlPath), new File(filePath));//暂时有问题
				}else{
					System.out.println(url);
					copyFile(url);
				}
			}
		}
	}
	
	public static void getRelativeFiles(String url) throws Exception{
		Document doc = Jsoup.connect(url).get();
        Elements links = doc.select("a[href]");
        Elements media = doc.select("[src]");
        Elements imports = doc.select("link[href]");
        
        for (Element link : imports) {
        	copyFile(link.attr("abs:href"));
        }
        
        for (Element link : links) {
        	copyFile(link.attr("abs:href"));
        }

        for (Element src : media) {
           copyFile(src.attr("abs:src"));
        }

	}

	private static void copyFile(String src0){
		try {
			if(src0!=null&&!src0.trim().equals("")){
				   System.out.println(src0);
				   File file=new File(basePath+getPath(src0));
				   if(!file.exists()){
					   FileUtils.copyURLToFile(new URL(src0), file);
					   if(src0.endsWith(".html")){
						   getRelativeFiles(src0);
					   }
				   }
			   }
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static String getPath(String src0) {
		return src0.substring(src0.indexOf("yyexamjs/")+"yyexamjs/".length());
	}
	
	private static void print(String msg, Object... args) {
        System.out.println(String.format(msg, args));
    }

    private static String trim(String s, int width) {
        if (s.length() > width)
            return s.substring(0, width-1) + ".";
        else
            return s;
    }
}
