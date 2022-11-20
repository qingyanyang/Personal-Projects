import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

public class MyBackground extends JPanel {
    private Image image;
    public void setImage(String path){
        try {
            File file = new File(path);
            this.image = ImageIO.read(file);
            this.repaint();
        }catch(Exception e){
            //e.printStackTrace();
            throw new RuntimeException("wrong!" + path);
        }
    }
    @Override
    protected void paintComponent(Graphics g){
        super.paintComponent(g);
        int width = getWidth();
        int height = getHeight();
        g.setColor(Color.blue);
        g.fillRect(0,0,width,height);
        if(this.image != null){
            g.drawImage(image, 0,0,width,height,null);
        }
    }
}
