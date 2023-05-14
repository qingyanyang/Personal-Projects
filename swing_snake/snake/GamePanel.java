import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.io.File;
import java.util.Random;

public class GamePanel extends JPanel implements KeyListener, ActionListener {
    int length;
    int[] snakeX = new int[600];
    int[] snakeY = new int[500];
    String direct;
    int foodX;
    int foodY;
    Random ran = new Random();

    int score;
    boolean isStart = false;
    boolean isFail = false;
    Timer timer = new Timer(100,this);
    public GamePanel(){
        init();
        this.setFocusable(true);
        this.addKeyListener(this);
        timer.start();
        }
    //initialization
    public void init(){
        length = 3;
        snakeX[0] = 100;snakeY[0] = 100;
        snakeX[1] = 75;snakeY[1] = 100;
        snakeX[2] = 50;snakeY[2] = 100;
        direct = "R";
        foodX = 25 + 25 * ran.nextInt(34);
        foodY = 75 + 25 * ran.nextInt(24);
        score = 0;
    }
    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        int width = this.getWidth();
        int height = this.getHeight();
        //header
        this.setBackground(Color.white);
        Data.header.paintIcon(this, g,25,0);
        g.setColor(Color.black);
        g.fillRect(25,75,850,600);

        g.setColor(Color.white);
        g.setFont(new Font("Arial", Font.PLAIN,15));
        g.drawString("length : " + length,740,630);
        g.drawString("score : " + score,740,650);


        Data.food.paintIcon(this,g,foodX,foodY);

        if(direct.equals("R")){
            Data.right.paintIcon(this,g,snakeX[0],snakeY[0]);
        }else if(direct.equals("L")){
            Data.left.paintIcon(this,g,snakeX[0],snakeY[0]);
        }else if(direct.equals("U")){
            Data.up.paintIcon(this,g,snakeX[0],snakeY[0]);
        }else if(direct.equals("D")){
            Data.down.paintIcon(this,g,snakeX[0],snakeY[0]);
        }

        for(int i = 1; i < length; i++){
            Data.body.paintIcon(this,g,snakeX[i],snakeY[i]);
        }

        if(isStart == false){
            g.setColor(Color.white);
            g.setFont(new Font("Phosphate", Font.PLAIN,60));
            g.drawString("press  space  to  start",145,360);
        }
        if(isFail){
            g.setColor(Color.RED);
            g.setFont(new Font("Phosphate", Font.PLAIN,50));
            g.drawString("you failed!",320,320);
            g.setColor(Color.white);
            g.setFont(new Font("Phosphate", Font.PLAIN,35));
            g.drawString("press  space  to  restart",250,360);
        }
    }

    @Override
    public void keyTyped(KeyEvent e) {

    }

    @Override
    public void keyPressed(KeyEvent e) {
        int keyCode = e.getKeyCode();
        if(keyCode == KeyEvent.VK_SPACE){
            if(isFail){
                isFail = false;
                init();
            }else{
                isStart = !isStart;
                repaint();
            }
        }
        if(keyCode == KeyEvent.VK_UP){
            direct = "U";
        }else if(keyCode == KeyEvent.VK_DOWN){
            direct = "D";
        }else if(keyCode == KeyEvent.VK_LEFT){
            direct = "L";
        }else if(keyCode == KeyEvent.VK_RIGHT){
            direct = "R";
        }
    }

    @Override
    public void keyReleased(KeyEvent e) {

    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if(isStart && isFail == false){
            if(snakeX[0] == foodX && snakeY[0] == foodY){
                length++;
                score += 10;
                foodX = 25 + 25 * ran.nextInt(34);
                foodY = 75 + 25 * ran.nextInt(24);
            }
            for(int i = length - 1; i > 0; i--){
                snakeX[i] = snakeX[i-1];
                snakeY[i] = snakeY[i-1];
            }
            if(direct.equals("R")){
                snakeX[0] = snakeX[0] + 25;
                if(snakeX[0] > 850){
                    snakeX[0] = 25;
                }
            }else if(direct.equals("L")){
                snakeX[0] = snakeX[0] - 25;
                if(snakeX[0] < 25){
                    snakeX[0] = 850;
                }
            }else if(direct.equals("U")){
                snakeY[0] = snakeY[0] - 25;
                if(snakeY[0] < 75){
                    snakeY[0] = 650;
                }
            }else if(direct.equals("D")){
                snakeY[0] = snakeY[0] + 25;
                if(snakeY[0] > 650){
                    snakeY[0] = 75;
                }
            }
            //fail rule
            for(int i = 1; i < length; i++){
                if(snakeX[0] == snakeX[i] && snakeY[0] == snakeY[i]){
                    isFail = true;
                }
            }
            repaint();
        }
        timer.start();
    }
}

