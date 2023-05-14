import javax.swing.*;

public class Snake {
    //main manu
    public static void main(String[] args) {
        JFrame frame = new MyFrame("snake! My first game!");
        frame.setBounds(10,10,900,720);
        frame.setResizable(false);
        frame.setVisible(true);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
}
