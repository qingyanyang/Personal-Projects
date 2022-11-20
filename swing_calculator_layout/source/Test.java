import javax.swing.*;

public class Test {
    public static void main(String[] args) {
        JFrame frame = new MyFrame("calculator");
        frame.setBounds(0,0,350,710);
        frame.setVisible(true);
        frame.setResizable(false);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
}
