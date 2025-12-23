class Container:
    """
    A container of integers that should support
    addition, removal, and search for the median integer
    """
    def __init__ (self):
         self.container = []

    def add(self, value: int) -> None:
        """
        Adds the specified value to the container

        :param value: int
        """
        # TODO: implement this method
        self.container.append(value)

    def delete(self, value: int) -> bool:
        """
        Attempts to delete one item of the specified value from the container
        
        :param value: int
        :return: True, if the value has been deleted, or
                 False, otherwise.
        """
        if value in self.container:
            self.container.remove(value)
        else:
            return False

    def get_median(self) -> int:
        """
        Finds the container's median integer value, which is
        the middle integer when the all integers are sorted in order.
        If the sorted array has an even length,
        the leftmost integer between the two middle 
        integers should be considered as the median.

        :return: The median if the array is not empty, or
        :raise:  a runtime exception, otherwise.
        """
        # TODO: implement this method
        length = len(self.container) 
        if length == 0:
            raise RuntimeError('empty container')
        a= sorted(self.container)
        midindex = length // 2
        if length % 2 == 0:
            valueindex = midindex - 1  #as we are told to find the left value between the two mid values when the lenght of the container is even
            return a[valueindex]
        else:
            return a[midindex]

            
            
            
            
            
            
        
        
     
