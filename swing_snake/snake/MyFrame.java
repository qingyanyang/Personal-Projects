import javax.swing.*;

public class MyFrame extends JFrame {
    public MyFrame(String tittle){
        super(tittle);
        JPanel jp = new GamePanel();
        this.add(jp);
    }
}
