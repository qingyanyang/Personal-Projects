
import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.io.File;

public class MyFrame extends JFrame {
    public MyFrame(String tittle) {
        super(tittle);
        MyBackground panelBack = new MyBackground();
        this.setContentPane(panelBack);
        panelBack.setImage("/Users/yangqingyan/IdeaProjects/snackSwing/layoutExercise2/source/background.jpg");
        panelBack.setPreferredSize(new Dimension(350,710));
        panelBack.setLayout(null);
        JPanel panel1 = new MyPanel(0,0,350,260);
        JPanel panel2 = new MyPanel(10,260,330,330);
        JPanel panel3 = new MyPanel(10,590,165,80);
        JPanel panel4 = new MyPanel(175,590,165,80);

        //Text field
        panel1.setLayout(new BorderLayout());
        JTextField jt = new JTextField(8);
        jt.setFont(new Font("Times New Roman", Font.PLAIN,40));
        jt.setBackground(Color.black);
        jt.setForeground(Color.white);
        panel1.add(jt, BorderLayout.SOUTH);
        jt.setPreferredSize(new Dimension(0,80));
        //button
        panel2.setLayout(new GridLayout(4,4));
        for(int i = 1; i <= 16; i++){
            panel2.add(new MyButton("/button" + i + ".png"));
        }
        panel3.setLayout(new GridLayout(1,1));
        panel3.add(new MyButton("/button17.png"));

        panel4.setLayout(new GridLayout(1,2));
        panel4.add(new MyButton("/button18.png"));
        panel4.add(new MyButton("/button19.png"));

        this.add(panel1);
        this.add(panel2);
        this.add(panel3);
        this.add(panel4);
        //this.add(panelBack);
    }
}
