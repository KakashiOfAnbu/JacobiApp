#include<iostream>

using namespace std;

class Square{
  private: int canh;
  public: Square(int a){
    this->canh = a;
  };
  public:friend class Rectangle;
};


class Rectangle{
  private: int dai,rong;
  public: Rectangle(int a, int b){
    dai = a;
    rong = b;
  };
  public:void area(Square obj,int count){
    int areaSquare = obj.canh * 4;
    int areaRec = (dai + rong)*2;
    cout << "Chu vi cua hinh vuong thu "<< count << " la: " << areaSquare << endl;
    cout << "Chu vi cua hinh chu nhat thu "<< count << " la: " << areaRec << endl;
  }
};
int main() {
  int count = 0;
  for(int i = 0; i<3; i++){
    count++;
    int x,y,z;
  cin >> x;
  cin >> y;
  cin >> z;
  Square hinhVuong = Square(x);
  Rectangle hinhChuNhat = Rectangle(y,z);
  hinhChuNhat.area(hinhVuong,count);
  }
	return 0;
}
