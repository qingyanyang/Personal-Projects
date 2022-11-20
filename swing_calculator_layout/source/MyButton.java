import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;

public class MyButton extends JButton {
    MyButton(String path) {
        try{
            Image img = ImageIO.read(getClass().getResource(path));
            this.setIcon(new ImageIcon(img));
        }catch(Exception e){
            System.out.println(e);
        }
        this.setBorderPainted(false);
        this.setFocusPainted(false);
        this.setContentAreaFilled(false);
        this.setFocusable(true);
    }
}
